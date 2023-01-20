import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IProductRepository} from "../domain/repositories/IProductRepository";
import {IProduct} from "../domain/models/IProduct";

@injectable()
class ShowProductService {

	constructor(@inject('ProductsRepository') private productRepository: IProductRepository) {}

	public async execute(id: number): Promise<IProduct> {
		const product = await this.productRepository.findById(id)

		if (!product) {
			throw new AppError('Product not found')
		}

		return product
	}
}

export default ShowProductService 
