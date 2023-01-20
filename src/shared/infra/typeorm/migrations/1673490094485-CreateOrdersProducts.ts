import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrdersProducts1673490094485 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "orders_products",
			columns: [
				{
					name: "id",
					type: "integer",
					isGenerated: true,
					isPrimary: true,
					generationStrategy: "increment"
				}, {
					name: "price",
					type: "decimal",
					precision: 10,
					scale: 2
				},
				{
					name: "quantity",
					type: "integer"
				},
				{
					name: "created_at",
					type: "timestamp with time zone",
					default: "now()"
				}, {
					name: "updated_at",
					type: "timestamp with time zone",
					default: "now()"
				}



			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('orders_products')
	}

}
