import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Item } from '../items/item.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123',
  database: process.env.DB_NAME || 'dashboard_db',
  entities: [Item],
  synchronize: false, // production'da false; development'ta true yapmak istersen değiştir
};
