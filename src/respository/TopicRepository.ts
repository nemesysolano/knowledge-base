import { Topic } from "../model";
import { ApplicationError } from "../error/ApplicationError";

export interface TopicRepository {
    save(topic: Topic): Promise<Topic>,
    findById(id: string): Promise<Topic | null>,
    findByIdAndVersion(id: string, version: number): Promise<Topic | null>,
    findAll(): Promise<Topic[]>,
}