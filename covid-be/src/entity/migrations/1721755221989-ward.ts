import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
export class Ward1721755221989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'ward',
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
                  name: 'district_id',
                  type: 'int',
                },
              ],
            }),
            true,
        );
        await queryRunner.createForeignKey(
          'ward',
          new TableForeignKey({
            columnNames: ['district_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'district',
            onDelete: 'CASCADE',
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ward');
    }

}
