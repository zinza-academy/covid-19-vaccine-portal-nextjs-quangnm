import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  entities: [__dirname + '/../entity/**/*.{ts,js}'],
  subscribers: [__dirname + '/../subscriber/*.{ts,js}'],
  migrationsTableName: 'migrations',
});

export default dataSource;
