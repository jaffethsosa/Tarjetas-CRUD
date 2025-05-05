import { Module } from '@nestjs/common';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TarjetasModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
