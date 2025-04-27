import { TopicRepository } from "../respository";
import { TopicServiceImpl } from "./impl/TopicServiceImpl";

export const ServiceFactory ={
    createToppicService: (topicRepository: TopicRepository) => new TopicServiceImpl(topicRepository)
}