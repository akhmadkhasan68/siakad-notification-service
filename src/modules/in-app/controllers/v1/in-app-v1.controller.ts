import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { InAppNotificationV1ResponseDto } from '../../dto/v1/in-app-notification-v1.response';
import { InAppNotificationPaginateV1RequestDto } from '../../dto/v1/index/in-app-notification-paginate-v1.request';
import { InAppService } from '../../services/in-app-notification.service';

@Controller({
    version: '1',
    path: 'in-app',
})
export class InAppV1Controller {
    constructor(private readonly inAppService: InAppService) {}

    @MessagePattern(ServiceCommands.NotificationService.V1.InApp.FetchPaginate)
    async fetchPaginate(
        @Payload()
        payload: {
            pagination: InAppNotificationPaginateV1RequestDto;
            user: any;
        },
    ): Promise<IPaginateResponse<InAppNotificationV1ResponseDto>> {
        const { pagination, user } = payload;

        const { data, meta } = await this.inAppService.fetchPaginate(
            user,
            pagination,
        );

        return {
            data: InAppNotificationV1ResponseDto.toResponses(data),
            meta,
        };
    }

    @MessagePattern(ServiceCommands.NotificationService.V1.InApp.FindOneById)
    async findOneById(
        @Payload() id: string,
    ): Promise<InAppNotificationV1ResponseDto> {
        const data = await this.inAppService.findOneById(id);

        return InAppNotificationV1ResponseDto.toResponse(data);
    }
}
