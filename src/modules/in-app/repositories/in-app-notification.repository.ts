import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InAppNotification } from 'src/databases/entities/in-app-notification.entity';
import { IInAppNotification } from 'src/databases/interaces/in-app-notification.interface';
import { Repository } from 'typeorm';

@Injectable()
export class InAppRepository {
    constructor(
        @InjectRepository(InAppNotification)
        readonly inAppRepository: Repository<IInAppNotification>,
    ) {}
}
