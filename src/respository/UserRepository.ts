import { User } from "../model";
import { ApplicationError } from "../error/ApplicationError";

export interface UserRepository {
    findByApiKey(apiKey: string): Promise<User | null>;
}