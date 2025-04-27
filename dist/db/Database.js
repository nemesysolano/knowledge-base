"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
const connectToDatabase = (url) => {
    const topicsList = JSON.parse(fs_1.default.readFileSync(url, 'utf-8'));
    const db = {
        topics: topicsList.reduce((acc, topic) => {
            const { id } = topic;
            if (!acc[id]) {
                acc[id] = [];
            }
            acc[id].push(topic);
            return acc;
        }, {})
    };
    return db;
};
exports.connectToDatabase = connectToDatabase;
