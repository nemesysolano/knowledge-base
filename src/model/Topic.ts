export enum TopicType {
    VIDEO = 'video',
    ARTICLE = 'article',
    PDF = 'pdf'
}

export type Topic =  {
    id: string,    
    url: string,
    description: string,
    type: TopicType,
    version: number,
    createdAt: Date,    
    updatedAt: Date | null,
    parentTopicId?: string
}