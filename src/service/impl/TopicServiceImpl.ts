import { TopicService } from "../";
import { CreateTopicRequest, CreateTopicResponse, FindAllTopicsResponse, FindTopicByIdResponse } from '../../dto';
import { Topic } from "../../model";
import { TopicRepository } from "../../respository";
import { ApplicationError } from "../../error";

export class TopicServiceImpl implements TopicService {
    private topicRepository: TopicRepository;

    constructor (topicRepository: TopicRepository) {
        this.topicRepository = topicRepository;
    }
    
    async findAll(): Promise<FindAllTopicsResponse> {
        const topics = await this.topicRepository.findAll();
        return ({
            topics: topics.map(topic => (topic as FindTopicByIdResponse))
        });
        
    }

    async findByIdAndVersion(id: string, version: number): Promise<FindTopicByIdResponse> {
        const topic = await this.topicRepository.findByIdAndVersion(id, version);
        if (!topic) {
            throw new ApplicationError('Topic not found. Please check the id and version', 404);
        }
        return {...topic, subtopics: await this.findChildrenById(topic)};
    }

    async createTopic(request: CreateTopicRequest): Promise<CreateTopicResponse> {
        const lastVersion = await this.topicRepository.findById(request.id);
        const today = new Date();
        const topic: Topic = {
          ...request, 
          createdAt: lastVersion ? lastVersion!!.createdAt : today, 
          updatedAt: !lastVersion ? null : today ,
          version: -1
        };
        const createdTopic = await this.topicRepository.save(topic);
        return createdTopic;
    }

    async findById(id: string): Promise<FindTopicByIdResponse> {
        const topic = await this.topicRepository.findById(id);
        if (!topic) {
            throw new ApplicationError('Topic not found. Please check the id', 404);
        }
        return {...topic, subtopics: await this.findChildrenById(topic)};
    }

    async findChildrenById(root: Topic): Promise<FindTopicByIdResponse[]> {
        const allTopics = (await this.topicRepository.findAll()).map(topic => ({...topic, subtopics:[]} as FindTopicByIdResponse));
        const visited = new Set<string>();
        const rootNode = {...root, subtopics: []} as FindTopicByIdResponse;
        const stack: FindTopicByIdResponse[] = [rootNode]; 

        while (stack.length > 0) {
            const current = stack.pop()!;            
            const subtopics = allTopics.filter(topic => topic.parentTopicId === current.id);

            current.subtopics = subtopics;
            visited.add(current.id);

            for (const subtopic of subtopics) {
                if (!visited.has(subtopic.id)) {
                    stack.push(subtopic);
                }
            }
        }
        
        return rootNode.subtopics;
    }
    
    async traverseUpTree(topic: Topic, direction: number): Promise<number> {
        let count = 0;
        let currentTopic: Topic | null = topic;
        
        while (currentTopic !== null) {
            count++;
            console.log(count, currentTopic.id);
            currentTopic = await this.topicRepository.findById(currentTopic!!.parentTopicId || '');
        }
        return count;
    }

    async findDistanceBetweenTopics(topicId1: string, topicId2: string): Promise<number> {
        const topic1 = await this.topicRepository.findById(topicId1);
        const topic2 = await this.topicRepository.findById(topicId2);

        if ((topic1 === null || topic2 === null)) {
            throw new ApplicationError('Either topicId1 or topicId2 does not exist', 404);
        }

        if(topicId1 === topicId2) {
            return 0;
        }

        const distance = await this.traverseUpTree(topic1!!, 1) + await this.traverseUpTree(topic2!!, 2);
        return distance;
    }
}

