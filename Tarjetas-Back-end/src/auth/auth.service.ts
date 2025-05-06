import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Pool } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MYSQL_POOL') private readonly db: Pool,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const [rows]: any = await this.db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) throw new UnauthorizedException('Correo no encontrado');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException('Contraseña incorrecta');

    // No devolver la contraseña
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string): Promise<any> {
    console.log('Recibiendo email:', email);
    console.log('Recibiendo password:', password);
  
    const user = await this.validateUser(email, password);
  
    const payload = { sub: user.id, email: user.email };
    console.log('Generando JWT con payload:', payload);
  
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
