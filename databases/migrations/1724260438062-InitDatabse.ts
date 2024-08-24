import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabse1724260438062 implements MigrationInterface {
    name = 'InitDatabse1724260438062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "in_app_notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "target_user_id" uuid NOT NULL, "type" character varying NOT NULL, "title" character varying NOT NULL, "message" text NOT NULL, "meta" jsonb NOT NULL, "is_read" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f871e2a23724692bbb5b3b75c98" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "in_app_notifications"`);
    }

}
