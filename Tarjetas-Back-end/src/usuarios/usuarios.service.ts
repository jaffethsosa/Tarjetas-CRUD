import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuarios/interfaces/usuario.interface';


@Injectable()
export class UsuariosService {
    constructor(@Inject('MYSQL_POOL') private readonly db: Pool) { }

    async crearUsuario(usuario: Usuario): Promise<Omit<Usuario, 'password'>> {
        const conn = await this.db.getConnection();
        try {
            const { nombre, email, password } = usuario;

            // Validar que el correo no esté registrado
            const [existe] = await conn.query('SELECT id FROM usuarios WHERE email = ?', [email]);
            if ((existe as any[]).length > 0) {
                throw new BadRequestException('El correo ya está registrado');
            }

            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            const [result]: any = await conn.query(
                'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
                [nombre, email, hashedPassword]
            );

            return {
                id: result.insertId,
                nombre,
                email,
            };
        } finally {
            conn.release();
        }
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        const [rows] = await this.db.query('SELECT id, nombre, email FROM usuarios');
        return rows as Usuario[];
      }
      

}
