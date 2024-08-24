import { IsArray } from 'class-validator';
import { ExmailCreateBasePayloadV1RequestDto } from './email-create-base-payload-v1.request';

export class EmailCreateBulkPayloadV1RequestDto extends ExmailCreateBasePayloadV1RequestDto {
    @IsArray()
    @IsArray({ each: true })
    emails: string[];
}
