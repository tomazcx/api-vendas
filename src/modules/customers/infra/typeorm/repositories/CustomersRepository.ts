import {ICreateCustomer} from "@modules/customers/domain/models/ICreateCustomer";
import {ICustomer} from "@modules/customers/domain/models/ICustomer";
import {ICustomersRepository} from "@modules/customers/domain/repositories/ICustomerRepository";
import {getRepository, Repository} from "typeorm";
import {Customer} from "../entities/Customer";

export class CustomersRepository implements ICustomersRepository {

	private ormRepository: Repository<Customer>

	constructor() {
		this.ormRepository = getRepository(Customer)
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

	public async find(): Promise<ICustomer[]> {
		const customers = await this.ormRepository.find()
		return customers
	}

	public async findById(id: number): Promise<ICustomer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: {
				id
			}
		})

		return customer
	}

	public async findByEmail(email: string): Promise<ICustomer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: {
				email
			}
		})

		return customer
	}


	public async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete({
			id
		})
	}
}

