import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import {FakeUsersRepository} from "../domain/repositories/fakes/FakeUsersRepository"
import {FakeHashProvider} from "../providers/HashProvider/fakes/FakeHashProvider"
import {CreateUserSerivce} from "./CreateUserService"

let fakeUserRepository: FakeUsersRepository
let createUser: CreateUserSerivce
let hashProvider: FakeHashProvider

describe('CreateUser', () => {

	beforeAll(() => {
		fakeUserRepository = new FakeUsersRepository()
		hashProvider = new FakeHashProvider()
		createUser = new CreateUserSerivce(fakeUserRepository, hashProvider)
	})

	it('should create a new user', async () => {
		const user = await createUser.execute({
			name: 'tomazcx',
			email: 'tomazcx06@gmail.com',
			password: '123456'
		})

		expect(user).toHaveProperty('id')
	})

	it('should not be able to create two users with the same email', async () => {
		await createUser.execute({
			name: 'tomazcx',
			email: 'tomazcx@gmail.com',
			password: '123456'
		})

		expect(
			createUser.execute({
				name: 'tomazcx',
				email: 'tomazcx@gmail.com',
				password: '123456'
			})
		).rejects.toBeInstanceOf(AppError)

	})
})
