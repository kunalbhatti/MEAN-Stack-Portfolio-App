import express from 'express';
import cors from 'cors';

import {
    connectToMongo
} from './util/database.util';

import AuthController from './controllers/auth.controller'
import AdminController from './controllers/admin.controller';
import ContentController from './controllers/content.controller';
import MessageController from './controllers/message.controller';

import {
    verifyToken
} from './middlewares/verify-token.middleware';
import path from 'path';

const port: string | number = process.env.PORT || 3000;

export default class App {
    private app: express.Application;

    constructor(private port: string | number) {
        this.app = express();
    }

    initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: false
        }));
    }

    initializeControllers(): void {
        this.app.use(express.static(path.join(__dirname, 'www')));
        this.app.use('/auth', new AuthController().router);
        this.app.use('/admin', verifyToken, new AdminController().router);
        this.app.use('/app', new ContentController().router);
        this.app.use('/messenger', new MessageController().router);
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, 'www', 'index.html'));
        });
    }

    listen(): void {
        connectToMongo(() => {
            this.app.listen(this.port, () => {
                this.initializeMiddlewares();
                this.initializeControllers();
                console.log(`Server listening on port ${this.port}`);
            });
        });
    }
}

new App(port).listen();