import {ICreateProduct} from "@modules/products/domain/models/ICreateProduct";
import {IProduct} from "@modules/products/domain/models/IProduct";
import {IUpdateStockProduct} from "@modules/products/domain/models/IUpdateStockProduct";
import {IProductRepository} from "@modules/products/domain/repositories/IProductRepository";
import {getRepository, In, Repository} from "typeorm";
import {Product} from "../entities/Product";

interface IFindProducts {
	id: number
}

export class ProductRepository implements IProductRepository {

	private ormRepository: Repository<Product>

	constructor() {
		this.ormRepository = getRepository(Product)
	}

	public async find(): Promise<IProduct[]> {
		const products = await this.ormRepository.find()
		return products
	}

	public async findByName(name: string): Promise<IProduct | undefined> {
		const product = this.ormRepository.findOne({
			where: {
				name
			}
		})

		return product
	}

	public async findById(id: number): Promise<IProduct | undefined> {
		const product = await this.ormRepository.findOne(id)

		return product
	}

	public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
		const productsIds = products.map(product => product.id)
		const existsProducts = await this.ormRepository.find({
			where: {
				id: In(productsIds)
			}
		})
		return existsProducts

	}

	public async create({name, price, quantity}: ICreateProduct): Promise<IProduct> {
		const product = this.ormRepository.create({name, price, quantity})
		await this.ormRepository.save(product)
		return product
	}

	public async save(product: Product): Promise<IProduct> {
		await this.ormRepository.save(product)
		return product
	}

	public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
		await this.ormRepository.save(products)
	}

	public async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete({id})
	}

}
