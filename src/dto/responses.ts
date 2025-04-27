import { TopicDTO } from "."
import { Topic, TopicType } from "../model"

export type CreateTopicResponse = {
    version: number,
    error?: string
}

export type FindAllTopicsResponse = {
    topics: TopicDTO[]
}

export type FindTopicByIdResponse = TopicDTO & {
    subtopics: FindTopicByIdResponse[]
}