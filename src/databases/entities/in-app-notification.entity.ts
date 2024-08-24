import { Column, Entity } from 'typeorm';
import { IInAppNotification } from '../interaces/in-app-notification.interface';
import { BaseEntity } from './base.entity';

@Entity({
    name: 'in_app_notifications',
})
export class InAppNotification
    extends BaseEntity
    implements IInAppNotification
{
    @Column({
        type: 'uuid',
        name: 'target_user_id',
    })
    targetUserId: string;

    @Column({
        type: 'varchar',
    })
    type: string;

    @Column({
        type: 'varchar',
    })
    title: string;

    @Column({
        type: 'text',
    })
    message: string;

    @Column({
        type: 'jsonb',
    })
    meta: any;

    @Column({
        type: 'boolean',
        name: 'is_read',
        default: false,
    })
    isRead: boolean;
}
