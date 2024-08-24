import { IsNotEmpty, IsString } from 'class-validator';

export class ExmailCreateBasePayloadV1RequestDto {
    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
