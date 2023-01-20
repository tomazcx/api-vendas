import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IOrder} from "../domain/models/IOrder";
import {IOrdersRepository} from "../domain/repositories/IOrdersRepository";

interface IRequest {
	id: number
}

@injectable()
export class ShowOrderService {

	constructor(@inject('OrdersRepository') private ordersRepository: IOrdersRepository) {}

	public async execute({id}: IRequest): Promise<IOrder> {
		const order = await this.ordersRepository.findById(id)

		if (!order) {
			throw new AppError("Order not found", 404)
		}

		return order
	}
}
