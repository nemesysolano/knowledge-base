import { Role } from "../model";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express"

export type AuthorizedRequestHandler = (request: ExpressRequest, response: ExpressResponse, next: NextFunction) => Promise<void>;
export interface AuthorizationService {
    hasPrivileges(apiToken: string, roles: Role[]): Promise<boolean>;
    authorizedRequest: (handler: AuthorizedRequestHandler, roles: Role[])=> AuthorizedRequestHandler;
}