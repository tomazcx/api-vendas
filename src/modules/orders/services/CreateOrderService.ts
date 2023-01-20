import {ICustomersRepository} from "@modules/customers/domain/repositories/ICustomerRepository";
import {IProductRepository} from "@modules/products/domain/repositories/IProductRepository";
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IOrder} from "../domain/models/IOrder";
import {IOrdersRepository} from "../domain/repositories/IOrdersRepository";

interface IProduct {
	id: number
	price: number
	quantity: number
}

interface IRequest {
	customer_id: number
	products: IProduct[]
}

@injectable()
export class CreateOrderService {

	constructor(
		@inject('OrdersRepository') private ordersRepository: IOrdersRepository,
		@inject('CustomersRepository') private customersRepository: ICustomersRepository,
		@inject('ProductsRepository') private productsRepository: IProductRepository
	) {}

	public async execute({customer_id, products}: IRequest): Promise<IOrder> {

		const customer = await this.customersRepository.findById(customer_id)

		if (!customer) {
			throw new AppError("Customer not found", 404)
		}

		const existsProducts = await this.productsRepository.findAllByIds(products)

		if (!existsProducts.length) {
			throw new AppError("Could not find any productl", 404)
		}

		const existsProductsIds = existsProducts.map(product => product.id)

		const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id))

		if (checkInexistentProducts.length) {
			throw new AppError("Could not find product ${checkInexistentProducts[0].id}")
		}

		const quantityAvailable = products.filter(
			product => existsProducts.filter(
				p => p.id === product.id
			)[0].quantity < product.quantity
		)

		if (quantityAvailable.length) {
			throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for {quantityAvailable[0].id}`)
		}

		const serializedProducts = products.map(product => ({
			id: product.id,
			quantity: product.quantity,
			price: Number(existsProducts.filter(p => p.id === product.id)[0].price)
		}))

		const order = await this.ordersRepository.createOrder({
			customer,
			products: serializedProducts
		})

		const {order_products} = order

		const updatedProductQuantity = order_products.map(
			product => {
				console.log(product)
				return ({
					id: product.id,
					quantity: existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity
				})

			})

		await this.productsRepository.updateStock(updatedProductQuantity)

		return order as IOrder

	}
}
