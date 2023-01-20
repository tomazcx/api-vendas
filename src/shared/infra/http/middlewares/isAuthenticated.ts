import {verify} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import authConfig from '@config/auth'
import AppError from "@shared/errors/AppError";

interface TokenPayload {
	name: string;
	id: number;
	iat: number;
	exp: number;
	sub: string;
}

export const isAuthenticated = (request: Request, response: Response, next: NextFunction): void => {
	const authHeader = request.headers.authorization

	if (!authHeader) {
		throw new AppError("JWT Token is missing", 401)
	}

	const authArray = authHeader.split(' ')
	const token = authArray[1]
	try {
		const decodeToken = verify(token, authConfig.jwt.secret)

		const {id} = decodeToken as TokenPayload

		request.user = {
			id: id
		}
		return next()
	} catch (err) {
		throw new AppError('Invalid JWT Token', 401)
	}

}
