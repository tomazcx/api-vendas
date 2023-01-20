import AppError from "@shared/errors/AppError"
import {inject, injectable} from "tsyringe"
import {ICustomersRepository} from "../domain/repositories/ICustomerRepository"

interface IRequest {
	id: number
}

@injectable()
export class DeleteCustomerService {

	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository) {}


	public async execute({id}: IRequest): Promise<void> {
		const customer = await this.customersRepository.findById(id)

		if (!customer) {
			throw new AppError("Customer not found", 404)
		}

		await this.customersRepository.deleteById(id)
	}
}
