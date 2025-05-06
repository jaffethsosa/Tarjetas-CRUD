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
                'INSERT INTO tarjetas (titulo, fecha_creacion) VALUES (?, NOW())',
                [data.titulo],
            );

            const tarjetaId = result.insertId;

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
        const [tarjetas] = await this.databBase.query('SELECT * FROM tarjetas');

        for (const tarjeta of tarjetas as any[]) {
            const [descripciones] = await this.databBase.query(
                'SELECT descripcion FROM descripciones WHERE tarjeta_id = ?',
                [tarjeta.id],
            );
            tarjeta.descripciones = (descripciones as any[]).map((d: any) => d.descripcion);
        }

        return tarjetas as any[];
    }

    async obtenerTarjetaPorId(tarjetaId: number): Promise<any> {
        const [tarjetas] = await this.databBase.query<any[]>('SELECT * FROM tarjetas WHERE id = ?', [tarjetaId]);

        if ((tarjetas as any[]).length === 0) {
            throw new Error('Tarjeta no encontrada');
        }

        const tarjeta = tarjetas[0];

        const [descripciones] = await this.databBase.query(
            'SELECT descripcion FROM descripciones WHERE tarjeta_id = ?',
            [tarjetaId],
        );

        tarjeta.descripciones = (descripciones as any[]).map((d: any) => d.descripcion);

        return tarjeta;
    }

    async actualizarTarjeta(tarjetaId: number, tarjetaData: TarjetaDTO): Promise<any> {
        const { titulo, descripciones } = tarjetaData;

        const connection = await this.databBase.getConnection();
        await connection.beginTransaction();

        try {
            const [updateTarjetaResult] = await connection.query<ResultSetHeader>(
                'UPDATE tarjetas SET titulo = ? WHERE id = ?',
                [titulo, tarjetaId],
            );

            if (updateTarjetaResult.affectedRows === 0) {
                throw new Error('Tarjeta no encontrada para actualizar');
            }

            await connection.query('DELETE FROM descripciones WHERE tarjeta_id = ?', [tarjetaId]);

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
