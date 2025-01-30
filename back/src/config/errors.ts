import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
	const output = {
		message: err.message,
		name: err.name,
		stack: err.stack
	};

	if (err instanceof CustomError) {
		console.info(output);
		res.status(err.code).json({ error: err.message, code: err.code });
	} else {
		console.error(output);
		res.status(500).json({ error: 'Internal server error', code: 500 });
	}
}

export class CustomError extends Error {
	code: number;
	constructor(code: number, message: string) {
		super(message);
		this.name = this.constructor.name;
		this.code = code
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ConflictError extends CustomError {
	constructor(message: string) {
			super(409, message);
	}
}

export class InvalidValueError extends CustomError {
	constructor(variableName: string) {
			super(422, `Invalid value for ${variableName}`);
	}
}

export class MissingParamError extends CustomError {
	constructor(paramName: string) {
		super(409, `Missing required parameter: ${paramName}`);
	}
}

export class NotFoundError extends CustomError {
	constructor(paramName: string) {
		super(404, `${paramName} not found`);
	}
}