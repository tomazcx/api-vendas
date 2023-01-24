import {ICreateCustomer} from "@modules/customers/domain/models/ICreateCustomer";
import {ICustomer} from "@modules/customers/domain/models/ICustomer";
import {ICustomersRepository} from "@modules/customers/domain/repositories/ICustomerRepository";
import {Repository} from "typeorm";
import {Customer} from "../entities/Customer";
import {dataSource} from "@shared/infra/typeorm";
import {SearchParams} from "@modules/customers/domain/repositories/ICustomerRepository";
import {ICustomerPaginate} from "@modules/customers/domain/models/ICustomerPaginate";

export class CustomersRepository implements ICustomersRepository {

	private ormRepository: Repository<Customer>

	constructor() {
		this.ormRepository = dataSource.getRepository(Customer)
	}

	public async create({name, email}: ICreateCustomer): Promise<ICustomer> {
		const customer = this.ormRepository.create({name, email})
		await this.ormRepository.save(customer)
		return customer
	}

	public async save(customer: ICustomer): Promise<ICustomer> {
		await this.ormRepository.save(customer)
		return customer
	}

	public async find({page, skip, take}: SearchParams): Promise<ICustomerPaginate> {
		const [customers, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount()

		const result: ICustomerPaginate = {
			per_page: take,
			total: count,
			current_page: page,
			data: customers
		}

		return result
	}

	public async findById(id: number): Promise<ICustomer | null> {
		const customer = await this.ormRepository.findOneBy({id})

		return customer
	}

	public async findByEmail(email: string): Promise<ICustomer | null> {
		const customer = await this.ormRepository.findOneBy({email})

		return customer
	}


	public async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete({
			id
		})
	}
}

