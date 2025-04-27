"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const respository_1 = require("./respository");
const service_1 = require("./service");
const controller_1 = require("./controller");
const controller_2 = require("./controller");
require("express-async-errors");
const db_1 = require("./db");
const server = (0, express_1.default)();
const port = 3000;
const databaseUrl = process.argv[2];
const database = (0, db_1.connectToDatabase)(databaseUrl);
const topicController = new controller_1.TopicController(service_1.ServiceFactory.createToppicService(respository_1.RepositoryFactory.createTopicRepository(database)));
server.use(express_1.default.json());
server.use(topicController.router());
server.use(controller_2.errorHandler);
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
