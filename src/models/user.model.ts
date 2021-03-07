import {
    InsertOneWriteOpResult,
    ObjectId
} from 'mongodb';

import {
    getDb
} from './../util/database.util';

export interface UserModel {
    name: string;
    email: string;
    password: string;
    role: string;
    _id ? : ObjectId;
}

export class User {

    static register(userData: UserModel): Promise < InsertOneWriteOpResult < any >> {
        const db = getDb();
        return db.collection('users').insertOne(userData);
    }

    static findUser(options: any): Promise < any > {
        const db = getDb();
        return db.collection('users').findOne(options);
    }
}