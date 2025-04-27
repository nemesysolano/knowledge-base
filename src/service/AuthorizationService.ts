import { Role } from "../model";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express"

export interface AuthorizationService {
    hasPrivileges(apiToken: string, roles: Set<Role>): Promise<boolean>;
    // authorizedRequest: (requestHandler: (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => void)
}

