"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const inmemory_1 = require("./inmemory");
exports.RepositoryFactory = {
    createTopicRepository: (database) => new inmemory_1.TopicRepositoryInMemoryImpl(database),
};
