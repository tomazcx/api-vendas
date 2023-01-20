import {inject, injectable} from "tsyringe";
import {ICustomersRepository} from "../domain/repositories/ICustomerRepository";
import {Customer} from "../infra/typeorm/entities/Customer";

@injectable()
export class ShowAllCostumersService {

	constructor(@inject('CustomersRepository') private customersRepository: ICustomersRepository) {}

	public async execute(): Promise<Customer[]> {
		const customers = await this.customersRepository.find()

		return customers
	}
}
