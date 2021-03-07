"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const database_util_1 = require("./../util/database.util");
class Project {
    static createProject(projectData) {
        const db = database_util_1.getDb();
        return db.collection('projects').insertOne(projectData);
    }
    static editProject(filter, update) {
        delete update._id; // removing the id from the object as it is immutable and can not be updated
        delete update['oldImage']; // removing the name of old image
        delete update['oldVideo']; // removing the name of old video
        const db = database_util_1.getDb();
        return db.collection('projects').updateOne(filter, {
            $set: update
        });
    }
    static deleteProject(filter) {
        const db = database_util_1.getDb();
        return db.collection('projects').deleteOne(filter);
    }
    static getProject(options) {
        const db = database_util_1.getDb();
        return db.collection('projects').findOne(options);
    }
    static getProjects() {
        const db = database_util_1.getDb();
        return db.collection('projects').find().toArray();
    }
}
exports.Project = Project;
