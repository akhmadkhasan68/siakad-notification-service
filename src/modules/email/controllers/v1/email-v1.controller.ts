import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, NatsContext, Payload } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { EmailCreateBulkPayloadV1RequestDto } from '../../dto/v1/create/email-create-bulk-payload-v1.request';
import { EmailCreatePayloadV1RequestDto } from '../../dto/v1/create/email-create-payload-v1.request';
import { EmailSendOTPPayloadV1Request } from '../../dto/v1/send-otp/email-send-otp-payload-v1.request';
import { EmailService } from '../../services/email.service';

@Controller({
    version: '1',
    path: 'email',
})
export class EmailV1Controller {
    constructor(private readonly emailService: EmailService) {}

    @EventPattern(ServiceCommands.NotificationService.V1.Email.SendEmail)
    async sendEmail(
        @Payload() payload: EmailCreatePayloadV1RequestDto,
        @Ctx() context: NatsContext,
    ): Promise<void> {
        console.log('Send email to: ', payload.email);
        console.log('Subject: ', payload.subject);
        console.log('Context: ', context.getArgs());
        console.log('Context: ', context.getHeaders());
        console.log('Context: ', context.getSubject());

        await this.emailService.sendEmail(
            payload.subject,
            payload.content,
            'basic',
            payload.email,
        );

        return;
    }

    @EventPattern(ServiceCommands.NotificationService.V1.Email.SendBulkEmail)
    async sendBulkEmail(
        @Payload() payload: EmailCreateBulkPayloadV1RequestDto,
        @Ctx() context: NatsContext,
    ): Promise<any> {
        console.log('Send bulk email to: ', payload.emails);
        console.log('Subject: ', payload.subject);
        console.log('Context: ', context.getArgs());
        console.log('Context: ', context.getHeaders());
        console.log('Context: ', context.getSubject());

        await this.emailService.sendBulkEmail(
            payload.subject,
            payload.content,
            'basic',
            payload.emails,
        );

        return;
    }

    @EventPattern(ServiceCommands.NotificationService.V1.Email.SendEmailOTP)
    async sendEmailOTP(
        @Payload() payload: EmailSendOTPPayloadV1Request,
        @Ctx() context: NatsContext,
    ): Promise<void> {
        console.log('Send email OTP to: ', payload.email);
        console.log('Context: ', context.getArgs());
        console.log('Context: ', context.getHeaders());
        console.log('Context: ', context.getSubject());

        await this.emailService.sendEmail(
            'Konfirmasi Kode OTP',
            {
                otp: payload.data.otp,
                otpExpiryInMinutes: payload.data.otpExpiryInMinutes,
            },
            'otp',
            payload.email,
        );

        return;
    }
}
