import { CreateTopicRequest, CreateTopicResponse, FindAllTopicsResponse, FindTopicByIdResponse } from '../dto';
import  { Topic, TopicType } from '../model/Topic';

export interface TopicService {
    createTopic(request: CreateTopicRequest): Promise<CreateTopicResponse>;
    findById(id: string): Promise<FindTopicByIdResponse>;
    findByIdAndVersion(id: string, version: number): Promise<FindTopicByIdResponse>;
    findAll(): Promise<FindAllTopicsResponse>;
}