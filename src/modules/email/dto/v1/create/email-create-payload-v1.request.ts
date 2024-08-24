import { IsString } from 'class-validator';
import { ExmailCreateBasePayloadV1RequestDto } from './email-create-base-payload-v1.request';

export class EmailCreatePayloadV1RequestDto extends ExmailCreateBasePayloadV1RequestDto {
    @IsString()
    email: string;
}
