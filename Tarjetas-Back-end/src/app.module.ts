import { Module } from '@nestjs/common';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { DatabaseModule } from './database/database.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TarjetasModule, 
    DatabaseModule, 
    UsuariosModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],

  
})


export class AppModule { }
