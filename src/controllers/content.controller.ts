import express from 'express'
import fs from 'fs';
import path from 'path';

import {
    ObjectId
} from 'mongodb';

import {
    Project,
    ProjectModel
} from './../models/project.model';

import responseCode from './../responses.json';

export default class ContentController {
    private _router = express.Router();

    get router() {
        return this._router;
    }
    constructor() {
        this.router.get('/get-projects', this.getProjects);
        this.router.get('/get-project/:projectId', this.getProject);
        this.router.get('/video/:videoName', this.getVideo);
        this.router.use('/images', express.static(path.join(__dirname, '../' ,'images'))); 
    }

    private getProjects(req: express.Request, res: express.Response) {
        Project.getProjects().then(
            (projects: ProjectModel[]) => {
                res.status(200).send({
                    projects
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

    private getProject(req: express.Request, res: express.Response) {
        Project.getProject({
            _id: new ObjectId(req.params.projectId)
        }).then(
            (project: ProjectModel) => {
                res.status(200).send({
                    project
                });
            }
        ).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }

    private getVideo(req: express.Request, res: express.Response) {

        const videoName = req.params.videoName;

        // get video stats (about 61MB)
        const videoPath = `./dist/videos/${videoName}`;
        const fileSize = fs.statSync(videoPath).size;

        const range = req.headers.range;
        if (!range) {
            return res.status(400).send("Requires Range header");
        }
        // Parse Range
        // Example: "bytes=32324-"
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ?
            parseInt(parts[1], 10) :
            fileSize - 1


        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath, {
            start,
            end
        });

        // Stream the video chunk to the client
        videoStream.pipe(res);
    }

}