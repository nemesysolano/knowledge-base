import express from 'express';
import { RepositoryFactory } from './respository';
import { ServiceFactory } from './service';
import { TopicController } from './controller';
import { errorHandler } from './controller';
import "express-async-errors";
import { connectToDatabase } from './db';

const server = express();
const port = 3000;
const databaseUrl = process.argv[2];
const database = connectToDatabase(databaseUrl);

const topicController = new TopicController(
	ServiceFactory.createToppicService(
		RepositoryFactory.createTopicRepository(database)
	)
);

server.use(express.json());
server.use(topicController.router());
server.use(errorHandler)
server.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
