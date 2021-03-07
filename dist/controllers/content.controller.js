"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("mongodb");
const project_model_1 = require("./../models/project.model");
const responses_json_1 = __importDefault(require("./../responses.json"));
class ContentController {
    constructor() {
        this._router = express_1.default.Router();
        this.router.get('/get-projects', this.getProjects);
        this.router.get('/get-project/:projectId', this.getProject);
        this.router.get('/video/:videoName', this.getVideo);
        this.router.use('/images', express_1.default.static(path_1.default.join(__dirname, '../', 'images')));
    }
    get router() {
        return this._router;
    }
    getProjects(req, res) {
        project_model_1.Project.getProjects().then((projects) => {
            res.status(200).send({
                projects
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    getProject(req, res) {
        project_model_1.Project.getProject({
            _id: new mongodb_1.ObjectId(req.params.projectId)
        }).then((project) => {
            res.status(200).send({
                project
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    getVideo(req, res) {
        const videoName = req.params.videoName;
        // get video stats (about 61MB)
        const videoPath = `./dist/videos/${videoName}`;
        const fileSize = fs_1.default.statSync(videoPath).size;
        const range = req.headers.range;
        if (!range) {
            return res.status(400).send("Requires Range header");
        }
        // Parse Range
        // Example: "bytes=32324-"
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ?
            parseInt(parts[1], 10) :
            fileSize - 1;
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
        const videoStream = fs_1.default.createReadStream(videoPath, {
            start,
            end
        });
        // Stream the video chunk to the client
        videoStream.pipe(res);
    }
}
exports.default = ContentController;
