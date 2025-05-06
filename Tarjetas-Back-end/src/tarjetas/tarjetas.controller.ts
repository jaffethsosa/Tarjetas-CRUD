import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { TarjetaDTO } from './interfaces/tarjeta.interface';

@Controller('tarjetas')
export class TarjetasController {
    constructor(private tarjetasService: TarjetasService) { }

    @Get()
    async obtenerTodas() {
        return await this.tarjetasService.obtenerTodas();
    }

    @Post()
    async crear(@Body() tarjeta: TarjetaDTO) {
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
        @Body() tarjetaData: TarjetaDTO,
    ) {
        const tarjetaActualizada = await this.tarjetasService.actualizarTarjeta(
            tarjetaId,
            tarjetaData,
        );
        return {
            message: 'Tarjeta actualizada correctamente',
            data: tarjetaActualizada,
        };
    }
}
