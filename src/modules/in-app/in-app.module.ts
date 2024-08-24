import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InAppNotification } from 'src/databases/entities/in-app-notification.entity';
import { InAppV1Controller } from './controllers/v1/in-app-v1.controller';
import { InAppRepository } from './repositories/in-app-notification.repository';
import { InAppService } from './services/in-app-notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([InAppNotification])],
    controllers: [InAppV1Controller],
    providers: [
        // Repositories
        InAppRepository,

        // Services
        InAppService,
    ],
    exports: [],
})
export class InAppModule {}
