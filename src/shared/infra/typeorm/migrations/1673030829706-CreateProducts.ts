import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1673030829706 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'products',
			columns: [
				{
					name: "id",
					type: "int",
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'price',
					type: 'decimal',
					precision: 10,
					scale: 2
				},
				{
					name: 'quantity',
					type: 'integer'
				},
				{
					name: 'createdAt',
					type: 'timestamp with time zone',
					default: 'now()'
				},
				{
					name: 'updatedAt',
					type: 'timestamp with time zone',
					default: 'now()'
				}

			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('products')


	}

}
