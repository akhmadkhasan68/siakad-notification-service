import { config } from 'src/config';
import { DataSourceOptions } from 'typeorm';
import { InAppNotification } from './entities/in-app-notification.entity';

export const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.name,
    entities: [InAppNotification],
    synchronize: false,
    // logging: config.app.env === 'development',
    logging: false,
    migrations: ['dist/databases/migrations/*{.ts,.js}'],
};
