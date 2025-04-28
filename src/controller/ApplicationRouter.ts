import { RouterOptions } from "express";
import { AuthorizationService, AuthorizedRequestHandler } from "../service";
import { Role, Topic } from "../model";
import { TopicController } from "./TopicController";
import asyncHandler from "express-async-handler";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction, Router } from "express"

const ApplicationRouter = (
    authorizationService: AuthorizationService, 
    topicController: TopicController,
    routerOptions?: RouterOptions
) => {

    const router = Router();
    const authorizedRequest =  (handler: AuthorizedRequestHandler, roles: Role[]) => authorizationService.authorizedRequest(handler, roles);
    const allRoles = [Role.ADMIN, Role.EDITOR, Role.VIEWER];
    const adminOnly = [Role.ADMIN];

    router.post(
        '/topics', 
        asyncHandler(
            authorizedRequest(
                (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => topicController.createTopic(req, res), adminOnly 
            ),
        )
    );
    
    router.get(
        '/topics/:id', 
        asyncHandler(
            authorizedRequest(
                (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => topicController.findById(req, res), allRoles 
            )
        )
    );

    router.get(
        '/topics/:id/:version', 
        asyncHandler(
            authorizedRequest(
                (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => topicController.findByIdAndVersion(req, res), allRoles 
            )
        )
    );

    router.get(
        '/topics', 
        asyncHandler(
            authorizedRequest(
                (req: ExpressRequest, res: ExpressResponse) => topicController.findAll(req, res), allRoles
            )
        )
    );

    router.get(
        '/distance/:id1/:id2', 
        asyncHandler(
            authorizedRequest(
                (req: ExpressRequest, res: ExpressResponse) => topicController.findDistanceBetweenTopics(req, res), allRoles
            )
        )
    );
    return router;
}

export default ApplicationRouter;
