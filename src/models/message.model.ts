import {
    Db,
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult,
    ObjectId,
    UpdateWriteOpResult,
} from 'mongodb';
import {
    getDb
} from './../util/database.util';

export interface MessageModel {
    name: string;
    email: string;
    subject: string;
    body: string;
    status: string;
    timestamp: Date;
}

export class Message {
    static createMessage(message: MessageModel): Promise < InsertOneWriteOpResult < any >> {
        const db: Db = getDb();

        return db.collection('messages').insertOne(message);
    }

    static getMessages(): Promise < MessageModel[] > {

        const db: Db = getDb();

        return db.collection('messages').find().sort({"timestamp": -1}).toArray();
    }

    static getUnreadCount(): Promise < number > {
        const db: Db = getDb();
        return db.collection('messages').find({
            status: 'unread'
        }).count();
    }

    static updateMessageStatus(filter: {
        _id: ObjectId
    }, status: string): Promise < UpdateWriteOpResult > {
        const db: Db = getDb();
        return db.collection('messages').updateOne(filter, {
            $set: {
                status
            }
        });
    }

    static deleteMessage(filter: {
        _id: ObjectId
    }): Promise<DeleteWriteOpResultObject>{
        const db: Db = getDb();
        return db.collection('messages').deleteOne(filter);
    }
}