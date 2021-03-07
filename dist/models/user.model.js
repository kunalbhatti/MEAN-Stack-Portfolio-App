"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_util_1 = require("./../util/database.util");
class User {
    static register(userData) {
        const db = database_util_1.getDb();
        return db.collection('users').insertOne(userData);
    }
    static findUser(options) {
        const db = database_util_1.getDb();
        return db.collection('users').findOne(options);
    }
}
exports.User = User;
