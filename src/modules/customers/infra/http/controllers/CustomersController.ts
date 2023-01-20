import {container} from "tsyringe";
import {CreateCustomerSerivce} from "@modules/customers/services/CreateCustomerService";
import {DeleteCustomerService} from "@modules/customers/services/DeleteCustomerService";
import {ShowAllCostumersService} from "@modules/customers/services/ShowAllCustomersService";
import {ShowCustomerService} from "@modules/customers/services/ShowCustomerService";
import {UpdateCustomerService} from "@modules/customers/services/UpdateCustomerService";
import {Request, Response} from "express";

export class CustomersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const showCustomersService = container.resolve(ShowAllCostumersService)
		const customers = await showCustomersService.execute()

		return response.status(200).json(customers)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const showCustomerService = container.resolve(ShowCustomerService)
		const id = Number(request.params.id)

		const customer = await showCustomerService.execute({id})

		return response.status(200).json(customer)
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const createCustomerService = container.resolve(CreateCustomerSerivce)
		const {name, email} = request.body

		const customer = await createCustomerService.execute({name, email})

		return response.status(201).json(customer)
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const updateCustomeService = container.resolve(UpdateCustomerService)
		const id = Number(request.params.id)
		const {name, email} = request.body

		const customer = await updateCustomeService.execute({id, name, email})

		return response.status(200).json(customer)
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const deleteCustomerService = container.resolve(DeleteCustomerService)
		const id = Number(request.params.id)

		await deleteCustomerService.execute({id})

		return response.status(204).json()

	}

}
