"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const mongodb_1 = require("mongodb");
const project_model_1 = require("./../models/project.model");
const responses_json_1 = __importDefault(require("./../responses.json"));
const multer_middleware_1 = require("./../middlewares/multer.middleware");
class AdminController {
    constructor() {
        this._router = express_1.default.Router();
        this.router.post('/create-project', this.createProject);
        this.router.patch('/edit-project', this.editProject);
        this.router.delete('/delete-file', this.deleteFile);
        this.router.delete('/delete-project', this.deleteProject);
        this.router.post('/upload-image', multer_middleware_1.saveImage.single('image'), this.uploadImage);
        this.router.post('/upload-video', multer_middleware_1.saveVideo.single('video'), this.uploadVideo);
    }
    get router() {
        return this._router;
    }
    createProject(req, res) {
        project_model_1.Project.createProject(req.body.data).then((project) => {
            req.body.data._id = project.insertedId;
            res.status(200).send({
                project: req.body.data
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    editProject(req, res) {
        project_model_1.Project.editProject({
            _id: new mongodb_1.ObjectId(req.body.data._id)
        }, {
            ...req.body.data
        }).then(() => {
            res.status(200).send({
                project: req.body.data
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    deleteProject(req, res) {
        const projectId = req.query.projectId;
        project_model_1.Project.deleteProject({
            _id: new mongodb_1.ObjectId(projectId.toString())
        }).then(() => {
            fs_1.default.unlink(`./dist/images/${req.query.imageName}`, () => { });
            fs_1.default.unlink(`./dist/videos/${req.query.videoName}`, () => { });
            res.status(200).send({
                deleted: true
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    // Bug: Sometimes does not delete the file. Sometimes the file content is deleted but the file is still visible.
    deleteFile(req, res) {
        const type = req.query['type'];
        const fileName = req.query['fileName'];
        if (type === 'image') {
            fs_1.default.unlink(`./dist/images/${fileName}`, () => { });
        }
        else {
            fs_1.default.unlink(`./dist/videos/${fileName}`, () => { });
        }
        res.send({ message: 'deletion flow activated' });
    }
    uploadImage(req, res) {
        res.status(200).send({
            message: 'image uploaded successfully'
        });
    }
    uploadVideo(req, res) {
        res.status(200).send({
            message: 'image uploaded successfully'
        });
    }
}
exports.default = AdminController;
