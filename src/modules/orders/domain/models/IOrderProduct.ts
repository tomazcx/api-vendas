import {IProduct} from "@modules/products/domain/models/IProduct"
import {IOrder} from "./IOrder"

export interface IOrderProduct {
	id: number
	price: number
	quantity: number
	order: IOrder
	product: IProduct
	created_at: Date
	updated_at: Date
}

