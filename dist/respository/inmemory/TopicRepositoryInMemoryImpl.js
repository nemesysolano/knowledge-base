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
exports.TopicRepositoryInMemoryImpl = void 0;
const model_1 = require("../../model");
const PersistenceError_1 = require("../PersistenceError");
const TOPIC_ID_REGIEX = /^[a-zA-Z0-9-_]{2,100}$/;
const HTTP_URL_WITH_OPTIONAL_QUERY_REGEX = /^(https?:\/\/[^\s/$.?#].[^\s]*)\??([^\s]*)?$/;
class TopicRepositoryInMemoryImpl {
    constructor(database) {
        this.database = database;
    }
    save(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const topicId = (topic.id || "").trim();
            const database = this.database;
            const topics = database.topics[topic.id] || [];
            const versionedTopic = Object.assign(Object.assign({}, topic), { id: topicId, version: topics.length + 1 });
            this.validateTopic(topic, topicId);
            database.topics[topic.id] = [...topics, versionedTopic];
            return versionedTopic;
        });
    }
    validateTopic(topic, topicId) {
        const database = this.database;
        if (topic.parentTopicId && !database.topics[topic.parentTopicId]) {
            throw new PersistenceError_1.PersistenceError('Parent topic not found', 400);
        }
        else if (!TOPIC_ID_REGIEX.test(topicId)) {
            throw new PersistenceError_1.PersistenceError('Invalid topic ID', 400);
        }
        if (!HTTP_URL_WITH_OPTIONAL_QUERY_REGEX.test(topic.url)) {
            throw new PersistenceError_1.PersistenceError('Invalid URL', 400);
        }
        if (!Object.values(model_1.TopicType).includes(topic.type)) {
            throw new PersistenceError_1.PersistenceError('Invalid topic type', 400);
        }
    }
    findById(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = this.database.topics[topicId];
            if (!topics || topics.length === 0) {
                return null;
            }
            return topics[topics.length - 1]; // Return the latest version
        });
    }
    findByIdAndVersion(id, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = this.database.topics[id];
            if (!topic || topic.length === 0) {
                return null;
            }
            if (version < 1 || version > topic.length) {
                return null;
            }
            return topic[version - 1]; // Return the requested version
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = this.database.topics;
            const allTopics = Object.keys(topics).map((topicId) => topics[topicId][topics[topicId].length - 1]);
            return allTopics;
        });
    }
}
exports.TopicRepositoryInMemoryImpl = TopicRepositoryInMemoryImpl;
