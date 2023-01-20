import {ICustomer} from "@modules/customers/domain/models/ICustomer"
import {IOrderProduct} from "./IOrderProduct"

export interface IOrder {
	id: number
	customer: ICustomer
	order_products: IOrderProduct[]
	created_at: Date
	updated_at: Date
}
