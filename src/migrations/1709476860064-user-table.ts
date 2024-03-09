import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1709476860064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'firstname',
                type: 'varchar',
              },
              {
                name: 'lastname',
                type: 'varchar',
              },
            ],
            engine: 'InnoDB',
          }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
