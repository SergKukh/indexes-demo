import { MigrationInterface, QueryRunner } from "typeorm";
import { faker } from '@faker-js/faker';

export class SeedUsers1709477496376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersData = Array.from({ length: 1000000 }).map((_, index) => ({
            id: index + 1,
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName()
        }));

        const batchSize = 1000;

        for (let offset = 0; offset < usersData.length; offset += batchSize) {
            const chunk = usersData.slice(offset, offset + batchSize);

            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into('users')
                .values(chunk)
                .execute();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('users')
            .execute();
    }

}
