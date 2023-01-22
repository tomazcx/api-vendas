import {ICreateCustomer} from "@modules/customers/domain/models/ICreateCustomer";
import {ICustomer} from "@modules/customers/domain/models/ICustomer";
import {ICustomersRepository} from "@modules/customers/domain/repositories/ICustomerRepository";
import {Customer} from "@modules/customers/infra/typeorm/entities/Customer";
import {getRepository, Repository} from "typeorm";

export class FakeCustomersRepository implements ICustomersRepository {

	private customers: Customer[] = []

	public async create({name, email}: ICreateCustomer): Promise<ICustomer> {
		const customer = new Customer()

		const lastId = this.customers.length > 0 ? this.customers[this.customers.length - 1].id : -1

		customer.id = lastId + 1
		customer.name = name
		customer.email = email

		this.customers.push(customer)

		return customer
	}

	public async save(customer: ICustomer): Promise<ICustomer> {
		const findIndex = this.customers.indexOf(customer)
		this.customers[findIndex] = customer
		return customer
	}

	public async find(): Promise<ICustomer[]> {
		return this.customers
	}

	public async findById(id: number): Promise<ICustomer | undefined> {
		const customer = this.customers.find(customer => customer.id === id)
		return customer
	}

	public async findByEmail(email: string): Promise<ICustomer | undefined> {
		const customer = this.customers.find(customer => customer.email === email)
		return customer
	}


	public async deleteById(id: number): Promise<void> {
		this.customers = this.customers.filter(customer => customer.id !== id)
	}
}

