import {ICreateOrder} from "@modules/orders/domain/models/ICreateOrder";
import {IOrder} from "@modules/orders/domain/models/IOrder";
import {IOrdersRepository} from "@modules/orders/domain/repositories/IOrdersRepository";
import {getRepository, Repository} from "typeorm";
import {Order} from "../entities/Order";

export class OrdersRepository implements IOrdersRepository {

	private ormRepository: Repository<Order>

	constructor() {
		this.ormRepository = getRepository(Order)
	}

	public async findById(id: number): Promise<IOrder | undefined> {
		const order = await this.ormRepository.findOne(id, {
			relations: ['order_products', 'customer']
		})
		return order
	}

	public async createOrder({customer, products}: ICreateOrder): Promise<Order> {
		const order = this.ormRepository.create({customer, order_products: products})

		await this.ormRepository.save(order)

		return order
	}
}
