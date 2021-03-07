"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = exports.getDb = void 0;
const mongodb_1 = require("mongodb");
const config_json_1 = __importDefault(require("./../config.json"));
let db;
const getDb = () => {
    if (db) {
        return db;
    }
    throw 'Database not initialized';
};
exports.getDb = getDb;
const connectToMongo = (cb) => {
    const mongoClient = new mongodb_1.MongoClient(config_json_1.default.mongoDbUri);
    mongoClient.connect().then((client) => {
        console.log('Connected to Database');
        if (!db) {
            db = client.db();
        }
        cb();
    });
};
exports.connectToMongo = connectToMongo;
