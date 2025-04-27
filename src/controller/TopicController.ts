import { RESTController } from ".";
import { CreateTopicRequest, FindTopicByIdResponse } from "../dto";
import { TopicService } from "../service/TopicService";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction, Router } from "express"
import asyncHandler from "express-async-handler";

export class TopicController implements RESTController {
    private topicService: TopicService;
    constructor(topicService: TopicService) {
        this.topicService = topicService;
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

    router(): Router {
        const router = Router();
        const self = this;

        router.post(
            '/topics', 
            asyncHandler(
                (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => self.createTopic(req, res)
            )
        );
        
        router.get(
            '/topics/:id', 
            asyncHandler(
                (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => self.findById(req, res)
            )
        );

        router.get(
            '/topics/:id/:version', 
            asyncHandler(
                (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => self.findByIdAndVersion(req, res)
            )
        );

        router.get(
            '/topics', 
            asyncHandler(
                (req: ExpressRequest, res: ExpressResponse) => self.findAll(req, res)
            )
        );
        return router;
    }
}