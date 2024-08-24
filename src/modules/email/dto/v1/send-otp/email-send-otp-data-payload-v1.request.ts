import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendOTPDataPayloadV1Request {
    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsNumber()
    @IsNotEmpty()
    otpExpiryInMinutes: number;
}
