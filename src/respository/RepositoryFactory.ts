import { Database } from "../db";
import { TopicRepositoryInMemoryImpl, UserRepositoryInMemoryImpl } from "./inmemory";

export const RepositoryFactory = {
    createTopicRepository: (database: Database) => new TopicRepositoryInMemoryImpl(database),
    createUserRepository: (database: Database) => new UserRepositoryInMemoryImpl(database),
}
