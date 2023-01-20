import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1673489263576 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "orders",
			columns: [
				{
					name: "id",
					type: "integer",
					isGenerated: true,
					isPrimary: true,
					generationStrategy: "increment"
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
		await queryRunner.dropTable('orders')
	}

}
