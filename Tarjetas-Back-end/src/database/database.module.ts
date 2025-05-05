import { Module } from "@nestjs/common";
import { createPool } from "mysql2/promise";


const dataBase = createPool({
    host: 'localhost',
    user: 'Sosa',
    password: 'ElSosa.99',
    database: 'tarjetas_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

(async () => {
    try {
      console.log('Attempting to connect to the database...');
      const connection = await dataBase.getConnection();
      console.log('Database connected successfully!');
      connection.release();
    } catch (err) {
      console.error('Error connecting to the database:', err.message);
    }
  })();
  

@Module({
    providers:[
        {
            provide: 'MYSQL_POOL',
            useValue: dataBase,
        },
    ],
    exports:['MYSQL_POOL'],
})

export class DatabaseModule {}
