import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { ApplicationError } from '../error';

export const ErrorHandler =() =>( (error: Error, request: ExpressRequest, response: ExpressResponse, next: NextFunction) => {
    const isCustomError = error instanceof ApplicationError;
    const httpStatusCode = isCustomError ? (error as ApplicationError).getErrorCode() : 500;

    response.status(httpStatusCode).send({        
        error: error.message,
    });
})