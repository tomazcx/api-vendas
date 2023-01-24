import {inject, injectable} from "tsyringe";
import {ICustomerPaginate} from "../domain/models/ICustomerPaginate";
import {ICustomersRepository} from "../domain/repositories/ICustomerRepository";

interface SearchParams {
	page: number
	limit: number
}

@injectable()
export class ShowAllCostumersService {

	constructor(@inject('CustomersRepository') private customersRepository: ICustomersRepository) {}

	public async execute({page, limit}: SearchParams): Promise<ICustomerPaginate> {
		const skip = (page - 1) * limit
		const customers = await this.customersRepository.find({
			page,
			skip,
			take: limit
		})

		return customers
	}
}
