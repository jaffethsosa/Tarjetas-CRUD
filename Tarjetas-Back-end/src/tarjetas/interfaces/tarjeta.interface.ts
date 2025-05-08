import { ApiProperty } from '@nestjs/swagger';

export class TarjetaDTO {
  @ApiProperty({ example: 'Tarjeta de ejemplo', description: 'Título de la tarjeta' })
  titulo: string;

  @ApiProperty({
    example: ['Descripción 1', 'Descripción 2'],
    description: 'Lista de descripciones',
    type: [String],
  })
  descripciones: string[];

  @ApiProperty({ example: 1234567890123456, description: 'Número de la tarjeta' })
  numero_tarjeta: number;
}
