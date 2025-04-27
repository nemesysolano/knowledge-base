import { Topic, User } from "../model";
import fs from "fs";
import os from "os";
import path from "path";

export interface Database {
    topics: Record<string, Topic[]> ,
    users: Record<string, User[]>,
}

const loadFromUrl = <T> (url: string) => (JSON.parse(fs.readFileSync(url, 'utf-8')) as T[]).reduce((acc: Record<string,T[]>, item: T) => {
        const id = (item as any).id;
        
        if (!acc[id]) {
            acc[id] = [];
        }

        acc[id].push(item);
        return acc;
    },
    {} as Record<string, T[]>
);


export const connectToDatabase = (url: string): Database => {
    const db: Database = {
        topics: loadFromUrl<Topic>(path.join(url, "topics.json")),
        users: loadFromUrl<User>(path.join(url, "users.json"))
    }

    return db;
}
