export interface IUser {
	id: number
	name: string
	email: string
	password: string
	avatar: string | undefined
	createdAt: Date
	updatedAt: Date
}
