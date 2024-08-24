import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { databaseConfig } from './databases/config';
import { InAppModule } from './modules/in-app/in-app.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        ClientsModule.register([
            {
                name: 'NATS_SERVICE',
                transport: Transport.NATS,
                options: {
                    url: config.nats.url,
                },
            },
        ]),

        InAppModule,
    ],
    exports: [ClientsModule],
})
export class AppModule {}
