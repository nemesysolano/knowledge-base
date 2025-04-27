import { Topic, TopicType } from "../model";

export type CreateTopicRequest = {
    id: string,    
    url: string,
    description: string,
    type: TopicType,
    parentTopicId?: string
}