import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { config } from 'src/config';
import { EmailV1Controller } from './controllers/v1/email-v1.controller';
import { EmailService } from './services/email.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: config.smtp.host,
                port: config.smtp.port,
                secure: config.smtp.tls,
                auth: {
                    user: config.smtp.user,
                    pass: config.smtp.pass,
                },
            },
            defaults: {
                from: `"Support SMAN 18 Surabaya" <${config.smtp.from}>`,
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [EmailV1Controller],
    providers: [EmailService],
    exports: [],
})
export class EmailModule {}
