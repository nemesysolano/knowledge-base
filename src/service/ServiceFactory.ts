import { TopicRepository, UserRepository } from "../respository";
import { AuthorizationServiceImpl } from "./impl/AuthorizationServiceImpl";
import { TopicServiceImpl } from "./impl/TopicServiceImpl";

export const ServiceFactory ={
    createTopicService: (topicRepository: TopicRepository) => new TopicServiceImpl(topicRepository),
    createAuthorizationService: (userRepository: UserRepository) => new AuthorizationServiceImpl(userRepository)
}