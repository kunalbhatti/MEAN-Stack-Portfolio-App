"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const database_util_1 = require("./../util/database.util");
class Message {
    static createMessage(message) {
        const db = database_util_1.getDb();
        return db.collection('messages').insertOne(message);
    }
    static getMessages() {
        const db = database_util_1.getDb();
        return db.collection('messages').find().sort({ "timestamp": -1 }).toArray();
    }
    static getUnreadCount() {
        const db = database_util_1.getDb();
        return db.collection('messages').find({
            status: 'unread'
        }).count();
    }
    static updateMessageStatus(filter, status) {
        const db = database_util_1.getDb();
        return db.collection('messages').updateOne(filter, {
            $set: {
                status
            }
        });
    }
    static deleteMessage(filter) {
        const db = database_util_1.getDb();
        return db.collection('messages').deleteOne(filter);
    }
}
exports.Message = Message;
