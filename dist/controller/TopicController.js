"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicController = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class TopicController {
    constructor(topicService) {
        this.topicService = topicService;
    }
    createTopic(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const createTopicResponse = yield this.topicService.createTopic(request.body);
            response.status(200).json(createTopicResponse);
            return Promise.resolve();
        });
    }
    findById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield this.topicService.findById(request.params.id);
            response.status(200).json(topic);
            return Promise.resolve();
        });
    }
    findByIdAndVersion(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield this.topicService.findByIdAndVersion(request.params.id, parseInt(request.params.version));
            response.status(200).json(topic);
            return Promise.resolve();
        });
    }
    findAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = yield this.topicService.findAll();
            response.status(200).json(topics);
            return Promise.resolve();
        });
    }
    router() {
        const router = (0, express_1.Router)();
        const self = this;
        router.post('/topics', (0, express_async_handler_1.default)((req, res, next) => self.createTopic(req, res)));
        router.get('/topics/:id', (0, express_async_handler_1.default)((req, res, next) => self.findById(req, res)));
        router.get('/topics/:id/:version', (0, express_async_handler_1.default)((req, res, next) => self.findByIdAndVersion(req, res)));
        router.get('/topics', (0, express_async_handler_1.default)((req, res) => self.findAll(req, res)));
        return router;
    }
}
exports.TopicController = TopicController;
