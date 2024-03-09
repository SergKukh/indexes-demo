import { MigrationInterface, QueryRunner } from "typeorm";

export class UserNameIndex1709501398905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE INDEX idx_lastname_firstname ON users (lastname, firstname)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP INDEX idx_lastname_firstname ON users");
  }
}
