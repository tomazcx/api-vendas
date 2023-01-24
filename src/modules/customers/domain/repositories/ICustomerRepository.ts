import {ICreateCustomer} from "../models/ICreateCustomer";
import {ICustomer} from "../models/ICustomer";
import {ICustomerPaginate} from "../models/ICustomerPaginate";

export interface SearchParams {
	page: number
	skip: number
	take: number
}

export interface ICustomersRepository {
	findById(id: number): Promise<ICustomer | null>
	findByEmail(email: string): Promise<ICustomer | null>
	deleteById(id: number): Promise<void>
	find(params: SearchParams): Promise<ICustomerPaginate>
	create(data: ICreateCustomer): Promise<ICustomer>
	save(data: ICustomer): Promise<ICustomer>
}
