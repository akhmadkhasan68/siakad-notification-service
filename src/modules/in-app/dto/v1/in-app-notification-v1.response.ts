import { IInAppNotification } from 'src/databases/interaces/in-app-notification.interface';

export class InAppNotificationV1ResponseDto {
    id?: string;
    targetUserId: string;
    type: string;
    title: string;
    message: string;
    meta: any;
    isRead: boolean;
    createdAt?: Date;

    static toResponse(
        data: IInAppNotification,
    ): InAppNotificationV1ResponseDto {
        const response = new InAppNotificationV1ResponseDto();
        Object.assign(response, data);

        return response;
    }

    static toResponses(
        data: IInAppNotification[],
    ): InAppNotificationV1ResponseDto[] {
        return data.map((item) => this.toResponse(item));
    }
}
