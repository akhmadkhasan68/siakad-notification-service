import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    forgotPasswordUrl:
        process.env.FORGOT_PASSWORD_URL ||
        'https://mydomain.com/reset-password',
    app: {
        env: process.env.APP_ENV || 'development',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        name: process.env.DB_NAME || 'postgres',
    },
    nats: {
        url: process.env.NATS_URL || 'nats://localhost:4222',
    },
    smtp: {
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
        port: parseInt(process.env.SMTP_PORT) || 2525,
        user: process.env.SMTP_USER || 'user',
        pass: process.env.SMTP_PASS || 'pass',
        from: process.env.SMTP_FROM || 'noreply@mail.com',
        tls: process.env.SMTP_TLS === 'true',
    },
};
