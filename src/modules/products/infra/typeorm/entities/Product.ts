import {OrdersProducts} from "@modules/orders/infra/typeorm/entities/OrdersProducts";
import {IProduct} from "@modules/products/domain/models/IProduct";
import {Column, CreateDateColumn, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Entity} from "typeorm";

@Entity('products')
export class Product implements IProduct {
	@PrimaryColumn('int')
	id: number;

	@Column()
	name: string;

	@Column('decimal')
	price: number;

	@Column('int')
	quantity: number;

	@OneToMany(() => OrdersProducts, orders_products => orders_products.product)
	order_products: OrdersProducts[]

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
