import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1673283689474 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'email',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'password',
					type: 'varchar'
				},
				{
					name: 'avatar',
					type: 'varchar',
					isNullable: true
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
		await queryRunner.dropTable('users')
	}
}
