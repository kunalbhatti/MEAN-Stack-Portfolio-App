import {
    getDb
} from './../util/database.util';


import {
    Db,
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult,
    ObjectId,
    UpdateWriteOpResult
} from 'mongodb';

export interface ProjectModel {
    _id ? : string;
    name: string;
    description: string;
    technology: string;
    github: string;
    preview: string;
    image: string;
    video: string;
}

export class Project {

    static createProject(projectData: ProjectModel): Promise < InsertOneWriteOpResult < any >> {
        const db: Db = getDb();
        return db.collection('projects').insertOne(projectData);
    }

    static editProject(filter: {
        _id: ObjectId
    }, update: ProjectModel): Promise < UpdateWriteOpResult > {
        delete update._id; // removing the id from the object as it is immutable and can not be updated
        delete update['oldImage']; // removing the name of old image
        delete update['oldVideo']; // removing the name of old video

        const db: Db = getDb();
        return db.collection('projects').updateOne(filter, {
            $set: update
        });
    }

    static deleteProject(filter: {
        _id: ObjectId
    }): Promise < DeleteWriteOpResultObject > {
        const db: Db = getDb();
        return db.collection('projects').deleteOne(filter);
    }

    static getProject(options: {
        _id: ObjectId
    }): Promise < ProjectModel > {
        const db: Db = getDb();

        return db.collection('projects').findOne(options);
    }

    static getProjects(): Promise < ProjectModel[] > {
        const db: Db = getDb();

        return db.collection('projects').find().toArray();
    }
}