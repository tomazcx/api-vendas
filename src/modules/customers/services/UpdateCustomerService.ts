import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {getCustomRepository} from "typeorm";
import {ICustomersRepository} from "../domain/repositories/ICustomerRepository";
import {Customer} from "../infra/typeorm/entities/Customer";
import {CustomersRepository} from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
	id: number
	name: string
	email: string
}

@injectable()
export class UpdateCustomerService {

	constructor(@inject("CustomersRepository") private customersRepository: ICustomersRepository) {}

	public async execute({id, name, email}: IRequest): Promise<Customer> {
		const isEmailBeingUsed = await this.customersRepository.findByEmail(email)

		if (isEmailBeingUsed && isEmailBeingUsed.id !== id) {
			throw new AppError("Email already being used", 422)
		}

		const customer = await this.customersRepository.findById(id)

		if (!customer) {
			throw new AppError("User not found", 404)
		}

		customer.name = name
		customer.email = email

		await this.customersRepository.save(customer)
		return customer
	}
}
