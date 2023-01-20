import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {ICreateCustomer} from "../domain/models/ICreateCustomer";
import {ICustomer} from "../domain/models/ICustomer";
import {ICustomersRepository} from "../domain/repositories/ICustomerRepository";

@injectable()
export class CreateCustomerSerivce {

	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository) {}

	public async execute({name, email}: ICreateCustomer): Promise<ICustomer> {
		const emailAlreadyExists = await this.customersRepository.findByEmail(email)

		if (emailAlreadyExists) {
			throw new AppError("This email is already being used.", 422)
		}

		const customer = await this.customersRepository.create({name, email})

		return customer

	}
}
