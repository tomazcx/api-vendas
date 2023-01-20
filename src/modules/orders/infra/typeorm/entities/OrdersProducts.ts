import {IOrderProduct} from "@modules/orders/domain/models/IOrderProduct";
import {Product} from "@modules/products/infra/typeorm/entities/Product";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Order} from "./Order";

@Entity('orders_products')
export class OrdersProducts implements IOrderProduct {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column('decimal')
	price: number

	@Column('integer')
	quantity: number

	@ManyToOne(() => Order, order => order.order_products)
	@JoinColumn({name: "order_id"})
	order: Order;

	@ManyToOne(() => Product, product => product.order_products)
	@JoinColumn({name: "product_id"})
	product: Product;


	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
