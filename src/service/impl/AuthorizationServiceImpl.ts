import { AuthorizationService } from "..";
import { Role } from "../../model";
import { UserRepository } from "../../respository";

export class AuthorizationServiceImpl implements AuthorizationService {
    private apiTokenRepository: UserRepository;

    constructor(apiTokenRepository: UserRepository) {
        this.apiTokenRepository = apiTokenRepository;
    }

    async hasPrivileges(apiKey: string, roles: Set<Role>): Promise<boolean> {
        const user = await this.apiTokenRepository.findByApiKey(apiKey);
        if (!user) {
            return false;
        }
        
        return roles.has(user.role);
    }

}