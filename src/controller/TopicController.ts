import { RESTController } from ".";
import { CreateTopicRequest, FindTopicByIdResponse } from "../dto";
import { Role } from "../model";
import { AuthorizationService, AuthorizedRequestHandler } from "../service";
import { TopicService } from "../service/TopicService";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction, Router } from "express"
import asyncHandler from "express-async-handler";

export class TopicController implements RESTController {
    private topicService: TopicService;    
    private authorizationService: AuthorizationService;

    constructor(topicService: TopicService, authorizationService: AuthorizationService) {
        this.topicService = topicService;
        this.authorizationService = authorizationService;
    }

    async createTopic(request: ExpressRequest, response: ExpressResponse): Promise<void> {
        const createTopicResponse = await this.topicService.createTopic(request.body as CreateTopicRequest);
        
        response.status(200).json(createTopicResponse);
        return Promise.resolve();
    }

    async findById(request: ExpressRequest, response: ExpressResponse): Promise<void> {
        const topic = await this.topicService.findById(request.params.id);
        
        response.status(200).json(topic);
        return Promise.resolve();
    }

    async findByIdAndVersion(request: ExpressRequest, response: ExpressResponse): Promise<void> {
        const topic = await this.topicService.findByIdAndVersion(request.params.id, parseInt(request.params.version));
        
        response.status(200).json(topic);
        return Promise.resolve();
    }

    async findAll(request: ExpressRequest, response: ExpressResponse): Promise<void> {
        const topics = await this.topicService.findAll();
        
        response.status(200).json(topics);
        return Promise.resolve();
    }

    async findDistanceBetweenTopics(request: ExpressRequest, response: ExpressResponse): Promise<void> {
        const topic1 = (await this.topicService.findById(request.params.id1)).id;
        const topic2 = (await this.topicService.findById(request.params.id2)).id;        
        const distance = await this.topicService.findDistanceBetweenTopics(topic1, topic2);
        
        response.status(200).json({ distance });

    }

}