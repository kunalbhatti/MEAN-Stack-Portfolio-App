import {
    Db,
    MongoClient
} from 'mongodb';

import config from './../config.json';

let db: Db;

export const getDb = (): Db => {
    if (db) {
        return db;
    }

    throw 'Database not initialized';
}

export const connectToMongo = (cb: () => void) => {
    const mongoClient: MongoClient = new MongoClient(config.mongoDbUri);

    mongoClient.connect().then(
        (client: MongoClient) => {
            console.log('Connected to Database');
            if (!db) {
                db = client.db();
            }
            cb();
        }
    )
}