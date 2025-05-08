import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { TarjetasService } from './tarjetas.service';
import { TarjetaDTO } from './interfaces/tarjeta.interface';


@ApiTags('Tarjetas') // Agrupa las rutas bajo el tag "Tarjetas"
@Controller('tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tarjetas' })
  async obtenerTodas() {
    return await this.tarjetasService.obtenerTodas();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarjeta' })
  @ApiBody({ type: TarjetaDTO }) // Describe el cuerpo de la solicitud
  async crear(@Body() tarjeta: TarjetaDTO) {
    return this.tarjetasService.createTarjeta(tarjeta);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarjeta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarjeta' }) // Describe el parámetro
  async obtenerTarjetaPorId(@Param('id') tarjetaId: number) {
    return this.tarjetasService.obtenerTarjetaPorId(tarjetaId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarjeta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarjeta' })
  async eliminar(@Param('id') tarjetaId: number) {
    return this.tarjetasService.deleteTarjeta(tarjetaId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarjeta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarjeta' })
  @ApiBody({ type: TarjetaDTO })
  async actualizar(@Param('id') tarjetaId: number, @Body() tarjetaData: TarjetaDTO) {
    return this.tarjetasService.actualizarTarjeta(tarjetaId, tarjetaData);
  }
}
