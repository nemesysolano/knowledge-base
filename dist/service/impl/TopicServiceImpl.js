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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicServiceImpl = void 0;
const respository_1 = require("../../respository");
class TopicServiceImpl {
    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = yield this.topicRepository.findAll();
            return ({
                topics: topics.map(topic => topic)
            });
        });
    }
    findByIdAndVersion(id, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield this.topicRepository.findByIdAndVersion(id, version);
            if (!topic) {
                throw new respository_1.PersistenceError('Topic not found. Please check the id and version', 404);
            }
            return Object.assign(Object.assign({}, topic), { subtopics: yield this.findChildrenById(topic) });
        });
    }
    createTopic(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastVersion = yield this.topicRepository.findById(request.id);
            const today = new Date();
            const topic = Object.assign(Object.assign({}, request), { createdAt: lastVersion ? lastVersion.createdAt : today, updatedAt: !lastVersion ? null : today, version: -1 });
            const createdTopic = yield this.topicRepository.save(topic);
            return createdTopic;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield this.topicRepository.findById(id);
            if (!topic) {
                throw new respository_1.PersistenceError('Topic not found. Please check the id', 404);
            }
            return Object.assign(Object.assign({}, topic), { subtopics: yield this.findChildrenById(topic) });
        });
    }
    findChildrenById(root) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTopics = (yield this.topicRepository.findAll()).map(topic => (Object.assign(Object.assign({}, topic), { subtopics: [] })));
            const visited = new Set();
            const stack = [Object.assign(Object.assign({}, root), { subtopics: [] })];
            const rootTopics = [];
            while (stack.length > 0) {
                const current = stack.pop();
                const subtopics = allTopics.filter(topic => topic.parentTopicId === current.id).map(topic => (Object.assign(Object.assign({}, topic), { topics: [] })));
                current.subtopics = subtopics;
                visited.add(current.id);
                if (current.parentTopicId) {
                    const parent = allTopics.find(topic => topic.id === current.parentTopicId);
                    if (parent && !visited.has(parent.id)) {
                        stack.push(parent);
                    }
                }
                else {
                    rootTopics.push(current);
                }
            }
            return rootTopics;
        });
    }
}
exports.TopicServiceImpl = TopicServiceImpl;
