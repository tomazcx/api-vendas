import {IUserTokensRepository} from "@modules/users/domain/repositories/IUserTokensRepository";
import {Repository} from "typeorm";
import {UserToken} from "../entities/UserToken";

export class UserTokensRepository implements IUserTokensRepository {

	constructor(private ormRepository: Repository<UserToken>) {
		this.ormRepository = ormRepository
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = await this.ormRepository.findOne({
			where: {
				token
			}
		})

		return userToken
	}

	public async generate(user_id: number): Promise<UserToken> {
		const userToken = this.ormRepository.create({
			user_id
		})

		await this.ormRepository.save(userToken)

		return userToken
	}

	public async deleteByToken(token: string): Promise<void> {
		await this.ormRepository.delete({token})
	}
}	
