import {  TopicRepository } from '../TopicRepository';
import { Topic } from '../../model';
import {  Database } from '../../db';
import { TopicType } from '../../model';
import { ApplicationError } from '../../error/ApplicationError';


const TOPIC_ID_REGIEX = /^[a-zA-Z0-9-_]{2,100}$/;
const HTTP_URL_WITH_OPTIONAL_QUERY_REGEX = /^(https?:\/\/[^\s/$.?#].[^\s]*)\??([^\s]*)?$/;

export class TopicRepositoryInMemoryImpl implements TopicRepository {
    private database: Database
    
    constructor(database: Database) {
        this.database = database;
    }


    async save(topic: Topic): Promise<Topic> {
        const topicId = (topic.id || "").trim();
        const database = this.database;
        const topics = database.topics[topic.id] || [];
        const versionedTopic = { ...topic, id: topicId, version: topics.length + 1};        
        this.validateTopic(topic, topicId);       
        database.topics[topic.id] = [...topics, versionedTopic];
        return versionedTopic;
    }

    validateTopic(topic: Topic, topicId: string) {
        const database = this.database;
        if(topic.parentTopicId && !database.topics[topic.parentTopicId]) {
            throw new ApplicationError('Parent topic not found', 400);

        } else if (!TOPIC_ID_REGIEX.test(topicId)) {
            throw new ApplicationError('Invalid topic ID', 400);

        }if (!HTTP_URL_WITH_OPTIONAL_QUERY_REGEX.test(topic.url)) {
            throw new ApplicationError('Invalid URL', 400);

        } if(!Object.values(TopicType).includes(topic.type)) {
            throw new ApplicationError('Invalid topic type', 400);

        }
    }
        
    async findById(topicId: string): Promise<Topic | null> {
        const topics = this.database.topics[topicId];
        if (!topics || topics.length === 0) {
            return null;
        }
        return topics[topics.length - 1]; // Return the latest version
    }

    async findByIdAndVersion(id: string, version: number): Promise<Topic | null> {
        const topic = this.database.topics[id];
        if (!topic || topic.length === 0) {
            return null;
        }
        
        if(version < 1 || version > topic.length) {
            return null;
        }

        return topic[version - 1]; // Return the requested version
        
    }

    async findAll(): Promise<Topic[]> {
        const topics = this.database.topics;
        const allTopics: Topic[] = Object.keys(topics).map((topicId) => topics[topicId][topics[topicId].length - 1]);
        
        return allTopics;        
    }
}
