import express from 'express'

import fs from 'fs';

import {
    InsertOneWriteOpResult,
    ObjectId
} from 'mongodb';

import {
    Project
} from './../models/project.model';

import responseCode from './../responses.json';

import {
    saveImage,
    saveVideo
} from './../middlewares/multer.middleware';

export default class AdminController {
    private _router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.post('/create-project', this.createProject);
        this.router.patch('/edit-project', this.editProject);
        this.router.delete('/delete-file', this.deleteFile);
        this.router.delete('/delete-project', this.deleteProject);
        this.router.post('/upload-image', saveImage.single('image'), this.uploadImage);
        this.router.post('/upload-video', saveVideo.single('video'), this.uploadVideo);
    }

    private createProject(req: express.Request, res: express.Response): void {
        Project.createProject(req.body.data).then(
            (project: InsertOneWriteOpResult < any > ) => {
                req.body.data._id = project.insertedId;
                res.status(200).send({
                    project: req.body.data
                });
            }
        ).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }

    private editProject(req: express.Request, res: express.Response): void {

        Project.editProject({
            _id: new ObjectId(req.body.data._id)
        }, {
            ...req.body.data
        }).then(
            () => {

                res.status(200).send({
                    project: req.body.data
                });

            }
        ).catch(
            error => {
                console.log(error);
                res.status(500).send({
                    message: responseCode[500]
                });
            }
        );
    }

    private deleteProject(req: express.Request, res: express.Response): void {
        const projectId = req.query.projectId;

        Project.deleteProject({
            _id: new ObjectId(projectId.toString())
        }).then(
            () => {
                fs.unlink(`./dist/images/${req.query.imageName}`, () => {});
                fs.unlink(`./dist/videos/${req.query.videoName}`, () => {});
                res.status(200).send({
                    deleted: true
                });


            }
        ).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }
 // Bug: Sometimes does not delete the file. Sometimes the file content is deleted but the file is still visible.
   deleteFile(req: express.Request, res: express.Response): void {
        const type = req.query['type'];
        const fileName = req.query['fileName'];

        if (type === 'image') {
            fs.unlink(`./dist/images/${fileName}`, () => {});
        } else {
            fs.unlink(`./dist/videos/${fileName}`, () => {});
        }

        res.send({message: 'deletion flow activated'});
    }

    private uploadImage(req: express.Request, res: express.Response): void {
        res.status(200).send({
            message: 'image uploaded successfully'
        });
    }

    private uploadVideo(req: express.Request, res: express.Response): void {
        res.status(200).send({
            message: 'image uploaded successfully'
        });
    }

}