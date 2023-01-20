import {ICreateCustomer} from "../models/ICreateCustomer";
import {ICustomer} from "../models/ICustomer";

export interface ICustomersRepository {
	findById(id: number): Promise<ICustomer | undefined>
	findByEmail(email: string): Promise<ICustomer | undefined>
	deleteById(id: number): Promise<void>
	find(): Promise<ICustomer[]>
	create(data: ICreateCustomer): Promise<ICustomer>
	save(data: ICustomer): Promise<ICustomer>
}
