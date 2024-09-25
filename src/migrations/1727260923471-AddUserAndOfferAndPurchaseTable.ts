import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAndOfferAndPurchaseTable1727260923471
  implements MigrationInterface
{
  name = 'AddUserAndOfferAndPurchaseTable1727260923471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"             uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "email"          character varying NOT NULL,
                                 "marketing_data" character varying NOT NULL,
                                 CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "purchases"
                             (
                                 "id"       uuid NOT NULL DEFAULT uuid_generate_v4(),
                                 "user_id"  uuid NOT NULL,
                                 "offer_id" uuid NOT NULL,
                                 CONSTRAINT "UQ_70d39a8d1cbbad030d29dac7e50" UNIQUE ("user_id", "offer_id"),
                                 CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "offers"
                             (
                                 "id"    uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "name"  character varying NOT NULL,
                                 "price" integer           NOT NULL,
                                 CONSTRAINT "UQ_f34d2ed1cd905ff6c3e30f62a1d" UNIQUE ("name"),
                                 CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "purchases"
        ADD CONSTRAINT "FK_024ddf7e04177a07fcb9806a90a" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "purchases"
        ADD CONSTRAINT "FK_b981f33dd17f21fe4efdd171a47" FOREIGN KEY ("offer_id") REFERENCES "offers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_b981f33dd17f21fe4efdd171a47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_024ddf7e04177a07fcb9806a90a"`,
    );
    await queryRunner.query(`DROP TABLE "offers"`);
    await queryRunner.query(`DROP TABLE "purchases"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
