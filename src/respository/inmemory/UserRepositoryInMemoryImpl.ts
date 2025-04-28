import { UserRepository } from "..";
import { Database } from "../../db";
import { User } from "../../model";

export class UserRepositoryInMemoryImpl implements UserRepository {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }


    async findByApiKey(apiKey: string): Promise<User | null> {
        const versions = this.database.users || [];
        const ids = Object.keys(versions)
        const userIndex = Object.keys(versions).findIndex((key:string) => versions[key][versions[key].length - 1].apiKey === apiKey);
        
        if(userIndex === -1) {
            return null;
        }

        const key = ids[userIndex];
        return versions[key][versions[key].length - 1];
    }

}