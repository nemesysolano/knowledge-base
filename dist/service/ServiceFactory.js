"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFactory = void 0;
const TopicServiceImpl_1 = require("./impl/TopicServiceImpl");
exports.ServiceFactory = {
    createToppicService: (topicRepository) => new TopicServiceImpl_1.TopicServiceImpl(topicRepository),
};
