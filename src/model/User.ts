export enum Role {
    ADMIN = 'admin',
    EDITOR = 'editor',
    VIEWER = 'viewer'
}

export type User = {
    id: string,
    name: string,
    email: string,
    role: Role,
    createdAt: Date,
    version: 1,
    apiKey: string
}