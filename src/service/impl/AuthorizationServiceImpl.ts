import { AuthorizationService } from "..";
import { Role } from "../../model";
import { ApplicationError, UserRepository } from "../../respository";
import { AuthorizedRequestHandler } from "../AuthorizationService";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction, Router } from "express"

export class AuthorizationServiceImpl implements AuthorizationService {
    private apiTokenRepository: UserRepository;

    constructor(apiTokenRepository: UserRepository) {
        this.apiTokenRepository = apiTokenRepository;
    }    

    async hasPrivileges(apiKey: string, roles: Role[]): Promise<boolean> {
        const user = await this.apiTokenRepository.findByApiKey(apiKey);
        if (!user) {
            return false;
        }
        
        return roles.some(role => user.role === role);
    }

    authorizedRequest (requestHandler: AuthorizedRequestHandler, roles: Role[]): AuthorizedRequestHandler {
        return (async (request: ExpressRequest, response: ExpressResponse, next: NextFunction) => {
            const authorization = request.headers.authorization
            
            if (!authorization) {
                throw new ApplicationError('Authorizartion header is missing', 401);
            }

            const hasPrivileges = await this.hasPrivileges(authorization, roles);
            if (!hasPrivileges) {
                throw new ApplicationError('User does not have the required privileges', 403);
            }
            await requestHandler(request, response, next);
        });
    }
    

}