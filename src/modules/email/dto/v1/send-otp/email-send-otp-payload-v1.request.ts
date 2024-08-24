import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { SendOTPDataPayloadV1Request } from './email-send-otp-data-payload-v1.request';

export class EmailSendOTPPayloadV1Request {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Type(() => SendOTPDataPayloadV1Request)
    data: SendOTPDataPayloadV1Request;
}
