import { Module } from '@nestjs/common';
import { TarjetasController } from './tarjetas.controller';
import { TarjetasService } from './tarjetas.service';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule, DatabaseModule],
  controllers: [TarjetasController],
  providers: [TarjetasService]
})
export class TarjetasModule { }
