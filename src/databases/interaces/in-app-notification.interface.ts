import { IBaseEntity } from './base.interface';

export interface IInAppNotification extends IBaseEntity {
    targetUserId: string;
    type: string;
    title: string;
    message: string;
    meta: any;
    isRead: boolean;
}
