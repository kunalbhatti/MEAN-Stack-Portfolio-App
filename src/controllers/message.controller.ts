import * as express from 'express';
import responseCode from './../responses.json';
import HelperUtil from '../util/helper.util';

import {
    Message,
    MessageModel
} from './../models/message.model';
import {
    ObjectId
} from 'mongodb';
import { verifyToken } from '../middlewares/verify-token.middleware';

export default class MessageController {
    private _router: express.Router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.post('/create-message', this.createMessage);
        this.router.post('/send-email', this.sendEmail);
        this.router.get('/get-messages', this.getMessages);
        this.router.get('/get-unread-count', this.getUnreadCount);
        this.router.patch('/update-message-status', verifyToken, this.updateMessageStatus);
        this.router.delete('/delete-message/:messageId', verifyToken, this.deleteMessage);
    }

    createMessage(req: express.Request, res: express.Response): void {
        const name = req.body.name;
        const email = HelperUtil.encryptString(req.body.email);
        const subject = req.body.subject;
        const body = req.body.body;

        const message: MessageModel = {
            name,
            email,
            body,
            subject,
            status: 'unread',
            timestamp: new Date()
        };

        Message.createMessage(message).then(
            () => {
                res.status(200).send({
                    message: 'Message sent successfully'
                });
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responseCode[500]
            });
        });

    }

    sendEmail(req: express.Request, res: express.Response): void {
        const email: string = req.body.email;
        const subject: string = req.body.subject;
        const body: string = req.body.body;

        HelperUtil.sendMail(email, subject, body).then(
            () => {
                res.status(200).send({
                    message: `Mail sent to ${email}.`
                });
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responseCode[500]
            });
        });
    }

    private getMessages(req: express.Request, res: express.Response): void {
        Message.getMessages().then(
            (messages: MessageModel[]) => {
                messages.map((message: MessageModel) => {
                    message.email = HelperUtil.decryptString(message.email);
                });

                res.status(200).send({
                    messages
                });
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responseCode[500]
            });
        });
    }

    getUnreadCount(req: express.Request, res: express.Response): void {
        Message.getUnreadCount().then(
            (count: number) => {
                res.status(200).send({
                    unreadCount: count
                });
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responseCode[500]
            });
        });
    }

    updateMessageStatus(req: express.Request, res: express.Response): void {
        Message.updateMessageStatus({
            _id: new ObjectId(req.body.messageId),
        }, req.body.status).then(
            () => {
                Message.getUnreadCount().then(
                    (count: number) => {
                        res.status(200).send({
                            status: req.body.status,
                            _id: req.body.messageId,
                            unreadCount: count
                        });
                    }
                ).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: 'Error retrieving updated count'
                    });
                });
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responseCode[500]
            });
        });
    }

    deleteMessage(req: express.Request, res: express.Response): void {
        Message.deleteMessage({
            _id: new ObjectId(req.params.messageId)
        }).then(
            () => {
                Message.getUnreadCount().then(
                    (count: number) => {
                        res.status(200).send({
                            _id: req.params.messageId,
                            unreadCount: count
                        });
                    }
                ).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: 'Error retrieving updated count'
                    });
                });
            }
        ).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responseCode[500]
            });
        });
    }
}