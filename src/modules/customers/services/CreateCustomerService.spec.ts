import AppError from '@shared/errors/AppError'
import 'reflect-metadata'
import {FakeCustomersRepository} from "../domain/repositories/fakes/FakeCustomersRepository"
import {CreateCustomerSerivce} from "./CreateCustomerService"

let fakeCustomerRepository: FakeCustomersRepository
let createCustomerService: CreateCustomerSerivce
describe('CreateCustomer', () => {

	beforeEach(() => {
		fakeCustomerRepository = new FakeCustomersRepository()
		createCustomerService = new CreateCustomerSerivce(fakeCustomerRepository)
	})

	it('should be able to create a new customer', async () => {
		const customer = await createCustomerService.execute({
			name: 'tomaz xavier',
			email: 'tomazcx06@gmail.com'
		})

		expect(customer).toHaveProperty('id')
	})

	it('should not be able to create two customers with the same email', async () => {
		await createCustomerService.execute({
			name: 'tomaz xavier',
			email: 'tomazcx06@gmail.com'
		})

		expect(
			createCustomerService.execute({
				name: 'tomaz xavier',
				email: 'tomazcx06@gmail.com'
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
