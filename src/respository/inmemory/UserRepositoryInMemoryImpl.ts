import { UserRepository } from "..";
import { Database } from "../../db";
import { User } from "../../model";

export class UserRepositoryInMemoryImpl implements UserRepository {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }


    async findByApiKey(apiKey: string): Promise<User | null> {
        const users = this.database.users[apiKey];
        if(users && users.length > 0) {
            return users[users.length - 1]; // Return the latest version
        }

        return null;
    }

}