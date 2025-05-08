import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly successLogger: winston.Logger;
  private readonly errorLogger: winston.Logger;

  constructor() {
    const logsDir = path.resolve(__dirname, '../../logs');

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Logger para logs de éxito    npm install @nestjs/swagger swagger-ui-express
    this.successLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, message }) => `[${timestamp}] ${message}`),
      ),
      transports: [
        new winston.transports.File({ filename: path.join(logsDir, 'success.log') }), // Archivo único
        new winston.transports.Console(), // Transporte de consola
      ],
    });

    // Logger para logs de error
    this.errorLogger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, message }) => `[${timestamp}] ${message}`),
      ),
      transports: [
        new winston.transports.File({ filename: path.join(logsDir, 'error.log') }), // Archivo único
        new winston.transports.Console(), // Transporte de consola
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: path.join(logsDir, 'exceptions.log') }), // Archivo único para excepciones
      ],
    });

    // Captura promesas rechazadas no manejadas
    process.on('unhandledRejection', (reason) => {
      this.errorLogger.error(`Unhandled Rejection: ${reason}`);
    });
  }

  // Método para registrar logs de éxito
  logSuccess(message: string, userId?: string) {
    const userInfo = userId ? `Usuario ${userId}` : 'Usuario no identificado';
    this.successLogger.info(`${userInfo} - ${message}`);
  }

  // Método para registrar logs de error
  logError(message: string, userId?: string) {
    const userInfo = userId ? `Usuario ${userId}` : 'Usuario no identificado';
    this.errorLogger.error(`${userInfo} - ${message}`);
  }
}
