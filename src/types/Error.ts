export interface Exception extends Error {
	message: string
	errorCode: ErrorCode
	status: number
}

export enum ErrorCode {
	ALREADY_EXISTS_ERROR = 'ALREADY_EXISTS_ERROR',
	INVALID_CREDENTIALS_ERROR = 'INVALID_CREDENTIALS_ERROR',
	BAD_REQUEST_ERROR = 'BAD_REQUEST_ERROR',
	INTERNAL_ERROR = 'INTERNAL_ERROR',
	DATABASE_ERROR = 'DATABASE_ERROR',
	UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR',
	DATA_NOT_FOUND_ERROR = 'DATA_NOT_FOUND_ERROR',
	VALIDATION_ERROR = 'VALIDATION_ERROR',
	PRISMA_ERROR = 'PRISMA_ERROR',
}