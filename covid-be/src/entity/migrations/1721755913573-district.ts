import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class District1721755913573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'district',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'province_id',
                        type: 'int',
                    },
                ],
            }),
            true,
        );
        await queryRunner.createForeignKey(
            'district',
            new TableForeignKey({
                columnNames: ['city_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'city',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('district');
    }

}
