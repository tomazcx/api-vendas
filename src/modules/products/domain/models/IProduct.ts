import {IOrderProduct} from "@modules/orders/domain/models/IOrderProduct"

export interface IProduct {
	id: number
	order_products: IOrderProduct[]
	name: string
	price: number
	quantity: number
	createdAt: Date
	updatedAt: Date
}
