import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(
        subject: string,
        content: any,
        template: string,
        email: string,
    ): Promise<void> {
        await this.mailerService
            .sendMail({
                to: email,
                subject,
                template: `../templates/${template}.hbs`,
                context: {
                    content,
                },
            })
            .catch((error) => {
                Logger.error(
                    `[${EmailService.name}] - Error: ${error.message}`,
                );
            })
            .finally(() => {
                Logger.log(`[${EmailService.name}] - Email sent to: ${email}`);
            });
    }

    async sendBulkEmail(
        subject: string,
        content: any,
        template: string,
        emails: string[],
    ): Promise<void> {
        emails.forEach(async (email) => {
            await this.sendEmail(subject, content, template, email);
        });
    }
}
