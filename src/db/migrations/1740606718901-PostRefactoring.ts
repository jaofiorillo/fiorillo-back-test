import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1740606718901 implements MigrationInterface {
    name = 'PostRefactoring1740606718901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."custom_field_type_enum" AS ENUM('BOOLEAN', 'TEXT', 'LIST')`);
        await queryRunner.query(`CREATE TABLE "custom_field" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying(400) NOT NULL, "type" "public"."custom_field_type_enum" NOT NULL, "text" character varying, "boolean" boolean, "list" json, "fkCardId" uuid, CONSTRAINT "PK_70c7eb2dfb5b81c051a6ba3ace8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."card_status_enum" AS ENUM('Criado', 'A fazer', 'Fazendo', 'Concluído')`);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying(400) NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."card_status_enum" NOT NULL, "fkUserId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'STANDARD_USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "custom_field" ADD CONSTRAINT "FK_1663da445c843134d0f66da2490" FOREIGN KEY ("fkCardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_a236ad60383cf9702bfd76f8817" FOREIGN KEY ("fkUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_a236ad60383cf9702bfd76f8817"`);
        await queryRunner.query(`ALTER TABLE "custom_field" DROP CONSTRAINT "FK_1663da445c843134d0f66da2490"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TYPE "public"."card_status_enum"`);
        await queryRunner.query(`DROP TABLE "custom_field"`);
        await queryRunner.query(`DROP TYPE "public"."custom_field_type_enum"`);
    }

}
