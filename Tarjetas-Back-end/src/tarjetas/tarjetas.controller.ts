import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { TarjetaDTO } from './interfaces/tarjeta.interface';
import { LoggerService } from '../logger/logger.service'; // Importa tu LoggerService

@Controller('tarjetas')
export class TarjetasController {
    constructor(
        private readonly tarjetasService: TarjetasService,
        private readonly loggerService: LoggerService, // Inyecta el LoggerService
    ) {}

    @Get()
    async obtenerTodas() {
        this.loggerService.logSuccess('Obteniendo todas las tarjetas'); // Usa tu LoggerService
        return await this.tarjetasService.obtenerTodas();
    }

    @Post()
    async crear(@Body() tarjeta: TarjetaDTO) {
        this.loggerService.logSuccess('Creando una nueva tarjeta'); // Usa tu LoggerService
        return this.tarjetasService.createTarjeta(tarjeta);
    }

    @Delete(':id')
    async eliminar(@Param('id') tarjetaId: number) {
        this.loggerService.logSuccess(`Eliminando tarjeta con ID: ${tarjetaId}`); // Usa tu LoggerService
        return this.tarjetasService.deleteTarjeta(tarjetaId);
    }

    @Get(':id')
    async obtenerTarjetaPorId(@Param('id') tarjetaId: number) {
        this.loggerService.logSuccess(`Obteniendo tarjeta con ID: ${tarjetaId}`); // Usa tu LoggerService
        return this.tarjetasService.obtenerTarjetaPorId(tarjetaId);
    }

    @Put(':id')
    async actualizar(
        @Param('id') tarjetaId: number,
        @Body() tarjetaData: TarjetaDTO,
    ) {
        this.loggerService.logSuccess(`Actualizando tarjeta con ID: ${tarjetaId}`); // Usa tu LoggerService
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
