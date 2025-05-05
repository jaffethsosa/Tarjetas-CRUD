import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';

@Controller('tarjetas')
export class TarjetasController {

    // Inyectar el servicio de tarjetas
    constructor(private tarjetasService: TarjetasService) { }

    @Get()
    async obtenerTodas() {
        return await this.tarjetasService.obtenerTodas();
    }

    @Post()
    async crear(
        @Body() tarjeta: { titulo: string; descripciones: string[] }
    ) {
        return this.tarjetasService.createTarjeta(tarjeta);
    }

    @Delete(':id')
    async eliminar(@Param('id') tarjetaId: number) {
        return this.tarjetasService.deleteTarjeta(tarjetaId);
    }

    @Get(':id')
    async obtenerTarjetaPorId(@Param('id') tarjetaId: number) {
        return this.tarjetasService.obtenerTarjetaPorId(tarjetaId);
    }

    @Put(':id')
    async actualizar(
        @Param('id') tarjetaId: number,
        @Body() tarjetaData: { titulo: string; descripciones: string[] },
    ) {
        try {
            const tarjetaActualizada = await this.tarjetasService.actualizarTarjeta(
                tarjetaId,
                tarjetaData,
            );
            return {
                message: 'Tarjeta actualizada correctamente',
                data: tarjetaActualizada,
            };
        } catch (error) {
            throw error;
        }
    }
}
