import { IsBoolean, IsOptional } from 'class-validator';
import { PaginateRequest } from 'src/common/requests/paginate.request';

export class InAppNotificationPaginateV1RequestDto extends PaginateRequest {
    @IsOptional()
    @IsBoolean()
    isRead?: boolean;
}
