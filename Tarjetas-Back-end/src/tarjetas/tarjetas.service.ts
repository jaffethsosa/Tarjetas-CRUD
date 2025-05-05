import { Inject, Injectable } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';

@Injectable()
export class TarjetasService {

    constructor(@Inject('MYSQL_POOL') private databBase: Pool) { }

    async createTarjeta(data: {
        titulo: string;
        descripciones: string[];
    }): Promise<any> {
        const conn = await this.databBase.getConnection();

        try {
            await conn.beginTransaction();

            // Crear la tarjeta
            const [result]: any = await conn.query(
                'INSERT INTO tarjetas (titulo, fecha_creacion) VALUES (?, NOW())',
                [data.titulo]
            );

            const tarjetaId = result.insertId;

            // Crear las descripciones de la tarjeta
            for (const desc of data.descripciones) {
                await conn.query(
                    'INSERT INTO descripciones (tarjeta_id, descripcion) VALUES (?, ?)',
                    [tarjetaId, desc]
                );
            }

            await conn.commit();
            return { message: 'Tarjeta creada con éxito', tarjetaId };
        } catch (error) {
            await conn.rollback();
            throw new Error('Error al crear la tarjeta: ' + error.message);
        } finally {
            conn.release();
        }
    }

    async obtenerTodas(): Promise<any[]> {
        // Obtener todas las tarjetas
        const [tarjetas] = await this.databBase.query('SELECT * FROM tarjetas');

        // Obtener las descripciones de cada tarjeta
        for (const tarjeta of tarjetas as any[]) {
            const [descripciones] = await this.databBase.query(
                'SELECT descripcion FROM descripciones WHERE tarjeta_id = ?',
                [tarjeta.id]
            );
            tarjeta.descripciones = (descripciones as any[]).map((d: any) => d.descripcion);
        }

        return tarjetas as any[];
    }


    async obtenerTarjetaPorId(tarjetaId: number): Promise<any> {
        // Obtener tarjeta
        const [tarjetas] = await this.databBase.query<any[]>('SELECT * FROM tarjetas WHERE id = ?', [tarjetaId]);

        if ((tarjetas as any[]).length === 0) {
            throw new Error('Tarjeta no encontrada');
        }

        // Usamos tarjetas[0] porque la consulta devuelve un arreglo con los resultados
        const tarjeta = tarjetas[0];

        // Obtener descripciones asociadas a la tarjeta
        const [descripciones] = await this.databBase.query(
            'SELECT descripcion FROM descripciones WHERE tarjeta_id = ?',
            [tarjetaId]
        );

        // Asignar descripciones a la tarjeta
        tarjeta.descripciones = (descripciones as any[]).map((d: any) => d.descripcion);

        return tarjeta;
    }


    async actualizarTarjeta(
        tarjetaId: number,
        tarjetaData: { titulo: string; descripciones: string[] }
    ): Promise<any> {
        const { titulo, descripciones } = tarjetaData;

        // Iniciar transacción
        const connection = await this.databBase.getConnection();
        await connection.beginTransaction();

        try {
            // Actualizar tarjeta
            const [updateTarjetaResult] = await connection.query<ResultSetHeader>(
                'UPDATE tarjetas SET titulo = ? WHERE id = ?',
                [titulo, tarjetaId]
            );

            if (updateTarjetaResult.affectedRows === 0) {
                throw new Error('Tarjeta no encontrada para actualizar');
            }


            // Eliminar descripciones antiguas
            await connection.query('DELETE FROM descripciones WHERE tarjeta_id = ?', [
                tarjetaId,
            ]);

            // Insertar nuevas descripciones
            const insertDescripcionesPromises = descripciones.map((descripcion) => {
                return connection.query(
                    'INSERT INTO descripciones (tarjeta_id, descripcion) VALUES (?, ?)',
                    [tarjetaId, descripcion]
                );
            });

            // Esperar todas las inserciones de descripciones
            await Promise.all(insertDescripcionesPromises);

            // Confirmar transacción
            await connection.commit();

            return { tarjetaId, titulo, descripciones };
        } catch (error) {
            // En caso de error, revertir transacción
            await connection.rollback();
            throw error;
        } finally {
            // Liberar la conexión
            connection.release();
        }
    }


    async deleteTarjeta(tarjetaId: number): Promise<any> {
        const conn = await this.databBase.getConnection();

        try {
            await conn.beginTransaction();

            // Eliminar las descripciones asociadas a la tarjeta
            await conn.query('DELETE FROM descripciones WHERE tarjeta_id = ?', [tarjetaId]);

            // Eliminar la tarjeta
            const [result]: any = await conn.query('DELETE FROM tarjetas WHERE id = ?', [tarjetaId]);

            // Revisamos si alguna fila fue afectada
            if (result.affectedRows === 0) {
                throw new Error('No se encontró la tarjeta con el ID proporcionado');
            }

            await conn.commit();
            return { message: 'Tarjeta y descripciones eliminadas correctamente' };
        } catch (error) {
            await conn.rollback();
            throw new Error('Error al eliminar la tarjeta: ' + error.message);
        } finally {
            // Liberar la conexión
            conn.release();
        }
    }



}
