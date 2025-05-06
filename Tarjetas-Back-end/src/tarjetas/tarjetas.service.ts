import { Inject, Injectable } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { TarjetaDTO } from './interfaces/tarjeta.interface';

@Injectable()
export class TarjetasService {
    constructor(@Inject('MYSQL_POOL') private databBase: Pool) { }

    async createTarjeta(data: TarjetaDTO): Promise<any> {
        const conn = await this.databBase.getConnection();

        try {
            await conn.beginTransaction();

            const [result]: any = await conn.query(
                'INSERT INTO tarjetas (titulo, fecha_creacion, numero_tarjetas) VALUES (?, NOW(), ?)',
                [data.titulo, data.numero_tarjeta], // Aquí agregamos el numero_tarjeta
            );

            const tarjetaId = result.insertId;

            // Insertar descripciones
            for (const desc of data.descripciones) {
                await conn.query(
                    'INSERT INTO descripciones (tarjeta_id, descripcion) VALUES (?, ?)',
                    [tarjetaId, desc],
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
        const [tarjetas] = await this.databBase.query<any[]>('SELECT * FROM tarjetas');
    
        for (const tarjeta of tarjetas) {
            tarjeta.numero_tarjeta = tarjeta.numero_tarjetas;
            delete tarjeta.numero_tarjetas;
    
            // Obtener descripciones asociadas a la tarjeta
            const [descripciones]: any[] = await this.databBase.query(
                'SELECT descripcion FROM descripciones WHERE tarjeta_id = ?',
                [tarjeta.id],
            );
    
            // Acceder a la propiedad rows de descripciones y mapear
            tarjeta.descripciones = descripciones.map((d: any) => d.descripcion);
        }
    
        return tarjetas;
    }
    

    async obtenerTarjetaPorId(tarjetaId: number): Promise<any> {
        const [tarjetas] = await this.databBase.query<any[]>(
            'SELECT * FROM tarjetas WHERE id = ?',
            [tarjetaId],
        );

        if (tarjetas.length === 0) {
            throw new Error('Tarjeta no encontrada');
        }

        const tarjeta = tarjetas[0];

        // Renombrar numero_tarjetas a numero_tarjeta
        tarjeta.numero_tarjeta = tarjeta.numero_tarjetas;
        delete tarjeta.numero_tarjetas;

        // Obtener descripciones asociadas a la tarjeta
        const [descripciones] = await this.databBase.query<any[]>(
            'SELECT descripcion FROM descripciones WHERE tarjeta_id = ?',
            [tarjetaId],
        );

        tarjeta.descripciones = descripciones.map((d) => d.descripcion);

        return tarjeta;
    }

    async actualizarTarjeta(tarjetaId: number, tarjetaData: TarjetaDTO): Promise<any> {
        const { titulo, descripciones, numero_tarjeta } = tarjetaData;

        const connection = await this.databBase.getConnection();
        await connection.beginTransaction();

        try {
            const [updateTarjetaResult] = await connection.query<ResultSetHeader>(
                'UPDATE tarjetas SET titulo = ?, numero_tarjetas = ? WHERE id = ?',
                [titulo, numero_tarjeta, tarjetaId],
            );

            if (updateTarjetaResult.affectedRows === 0) {
                throw new Error('Tarjeta no encontrada para actualizar');
            }

            // Eliminar las descripciones existentes
            await connection.query('DELETE FROM descripciones WHERE tarjeta_id = ?', [tarjetaId]);

            // Insertar las nuevas descripciones
            const insertDescripcionesPromises = descripciones.map((descripcion) =>
                connection.query(
                    'INSERT INTO descripciones (tarjeta_id, descripcion) VALUES (?, ?)',
                    [tarjetaId, descripcion],
                ),
            );

            await Promise.all(insertDescripcionesPromises);
            await connection.commit();

            return { tarjetaId, titulo, descripciones };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async deleteTarjeta(tarjetaId: number): Promise<any> {
        const conn = await this.databBase.getConnection();

        try {
            await conn.beginTransaction();

            // Eliminar las descripciones asociadas
            await conn.query('DELETE FROM descripciones WHERE tarjeta_id = ?', [tarjetaId]);
            const [result]: any = await conn.query('DELETE FROM tarjetas WHERE id = ?', [tarjetaId]);

            if (result.affectedRows === 0) {
                throw new Error('No se encontró la tarjeta con el ID proporcionado');
            }

            await conn.commit();
            return { message: 'Tarjeta y descripciones eliminadas correctamente' };
        } catch (error) {
            await conn.rollback();
            throw new Error('Error al eliminar la tarjeta: ' + error.message);
        } finally {
            conn.release();
        }
    }
}
