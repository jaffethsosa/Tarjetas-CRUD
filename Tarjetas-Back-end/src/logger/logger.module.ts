import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global() // Hacemos el LoggerService global para que esté disponible en toda la aplicación
@Module({
  providers: [LoggerService],
  exports: [LoggerService], 
})
export class LoggerModule {}