import express from 'express';
import { RepositoryFactory } from './respository';
import { ServiceFactory } from './service';
import { ApplicationRouter, ErrorHandler, TopicController } from './controller';
import "express-async-errors";
import { connectToDatabase } from './db';

const server = express();
const databaseUrl = "./data"; //Must be a relative path to the data folder
const database = connectToDatabase(databaseUrl);
const topicService = ServiceFactory.createTopicService(RepositoryFactory.createTopicRepository(database));
const authorizationService = ServiceFactory.createAuthorizationService(RepositoryFactory.createUserRepository(database));
const topicController = new TopicController(topicService, authorizationService);


server.use(express.json());
server.use(ApplicationRouter(authorizationService, topicController));
server.use(ErrorHandler())

export default server;