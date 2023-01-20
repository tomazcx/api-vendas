import {CreateOrderService} from "@modules/orders/services/CreateOrderService";
import {ShowOrderService} from "@modules/orders/services/ShowOrderService";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class OrdersController {
	public async show(request: Request, response: Response): Promise<Response> {
		const id = Number(request.params.id)

		const showOrder = container.resolve(ShowOrderService)
		const order = await showOrder.execute({id})

		return response.status(200).json(order)
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const createOrder = container.resolve(CreateOrderService)
		const {customer_id, products} = request.body

		const order = await createOrder.execute({
			customer_id,
			products
		})

		return response.status(201).json(order)

	}
}
