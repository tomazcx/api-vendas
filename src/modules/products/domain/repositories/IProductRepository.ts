import {ICreateProduct} from "../models/ICreateProduct";
import {IProduct} from "../models/IProduct";
import {IUpdateProductOrder} from "../models/IUpdateProductOrder";
import {IUpdateStockProduct} from "../models/IUpdateStockProduct";

export interface IProductRepository {
	findByName(name: string): Promise<IProduct | undefined>
	findById(id: number): Promise<IProduct | undefined>
	findAllByIds(products: {id: number}[]): Promise<IProduct[]>
	find(): Promise<IProduct[]>
	create(data: ICreateProduct): Promise<IProduct>
	save(data: ICreateProduct | IUpdateProductOrder[]): Promise<IProduct>
	uodateStock(products: IUpdateStockProduct[]): Promise<void>
	deleteById(id: number): Promise<void>
}
