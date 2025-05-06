import { Module } from "@nestjs/common";
import { createPool } from "mysql2/promise";


const poolProvider = {
  provide: 'MYSQL_POOL',
  useFactory: async () => {
    console.log('Attempting to connect to the database...');
    try {
      return await createPool({
        host: 'localhost',
        user: 'Sosa',
        password: 'ElSosa.99',
        database: 'tarjetas_db',
      });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw new Error('Failed to connect to the database');
    }
  },
};



@Module({
  providers: [poolProvider],
  exports: [poolProvider],
})

export class DatabaseModule { }
