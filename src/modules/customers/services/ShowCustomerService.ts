import AppError from "@shared/errors/AppError"
import {inject, injectable} from "tsyringe"
import {getCustomRepository} from "typeorm"
import {ICustomersRepository} from "../domain/repositories/ICustomerRepository"
import {Customer} from "../infra/typeorm/entities/Customer"
import {CustomersRepository} from "../infra/typeorm/repositories/CustomersRepository"
interface IRequest {
	id: number
}

@injectable()
export class ShowCustomerService {

	constructor(@inject("CustomersRepository") private customersRepository: ICustomersRepository) {}

	public async execute({id}: IRequest): Promise<Customer> {
		const customer = await this.customersRepository.findById(id)

		if (!customer) {
			throw new AppError("Customer not found", 404)
		}

		return customer
	}
}
