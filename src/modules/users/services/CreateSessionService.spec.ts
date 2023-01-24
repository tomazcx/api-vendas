import 'reflect-metadata'
import {FakeUsersRepository} from '@modules/users/domain/repositories/fakes/FakeUsersRepository'
import {FakeHashProvider} from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import {CreateSessionService} from '@modules/users/services/CreateSessionService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let createSessionService: CreateSessionService
let fakeHashProvider: FakeHashProvider
describe('CreateSession', () => {

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		fakeHashProvider = new FakeHashProvider()
		createSessionService = new CreateSessionService(fakeUsersRepository, fakeHashProvider)
	})

	it('should be able to authenticate', async () => {
		await fakeUsersRepository.create({
			name: 'tomaz',
			email: 'tomazcx06@gmail.com',
			password: '12345'
		})

		const response = await createSessionService.execute({email: 'tomazcx06@gmail.com', password: '12345'})

		expect(response).toHaveProperty('token')
	})

	it('should be able to fail because of wrong email', async () => {
		await fakeUsersRepository.create({
			name: 'tomaz',
			email: 'tomazcx06@gmail.com',
			password: '12345'
		})

		await expect(
			createSessionService.execute({email: 'tomazcx0@gmail.com', password: '12345'})
		).rejects.toBeInstanceOf(AppError)


	})

	it('should be able to fail because of wrong password', async () => {
		await fakeUsersRepository.create({
			name: 'tomaz',
			email: 'tomazcx06@gmail.com',
			password: '12345'
		})

		await expect(
			createSessionService.execute({email: 'tomazcx06@gmail.com', password: '1234'})
		).rejects.toBeInstanceOf(AppError)


	})


})
