import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/usuarios/interfaces/usuario.interface';


@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post()
    async crear(@Body() usuario: Usuario) {
        return this.usuariosService.crearUsuario(usuario);
    }

    @Get()
    async obtenerTodos() {
        return this.usuariosService.obtenerUsuarios();
    }

}
