"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const responses_json_1 = __importDefault(require("./../responses.json"));
const helper_util_1 = __importDefault(require("../util/helper.util"));
const message_model_1 = require("./../models/message.model");
const mongodb_1 = require("mongodb");
const verify_token_middleware_1 = require("../middlewares/verify-token.middleware");
class MessageController {
    constructor() {
        this._router = express.Router();
        this.router.post('/create-message', this.createMessage);
        this.router.post('/send-email', this.sendEmail);
        this.router.get('/get-messages', this.getMessages);
        this.router.get('/get-unread-count', this.getUnreadCount);
        this.router.patch('/update-message-status', verify_token_middleware_1.verifyToken, this.updateMessageStatus);
        this.router.delete('/delete-message/:messageId', verify_token_middleware_1.verifyToken, this.deleteMessage);
    }
    get router() {
        return this._router;
    }
    createMessage(req, res) {
        const name = req.body.name;
        const email = helper_util_1.default.encryptString(req.body.email);
        const subject = req.body.subject;
        const body = req.body.body;
        const message = {
            name,
            email,
            body,
            subject,
            status: 'unread',
            timestamp: new Date()
        };
        message_model_1.Message.createMessage(message).then(() => {
            res.status(200).send({
                message: 'Message sent successfully'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    sendEmail(req, res) {
        const email = req.body.email;
        const subject = req.body.subject;
        const body = req.body.body;
        helper_util_1.default.sendMail(email, subject, body).then(() => {
            res.status(200).send({
                message: `Mail sent to ${email}.`
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    getMessages(req, res) {
        message_model_1.Message.getMessages().then((messages) => {
            messages.map((message) => {
                message.email = helper_util_1.default.decryptString(message.email);
            });
            res.status(200).send({
                messages
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    getUnreadCount(req, res) {
        message_model_1.Message.getUnreadCount().then((count) => {
            res.status(200).send({
                unreadCount: count
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    updateMessageStatus(req, res) {
        message_model_1.Message.updateMessageStatus({
            _id: new mongodb_1.ObjectId(req.body.messageId),
        }, req.body.status).then(() => {
            message_model_1.Message.getUnreadCount().then((count) => {
                res.status(200).send({
                    status: req.body.status,
                    _id: req.body.messageId,
                    unreadCount: count
                });
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    message: 'Error retrieving updated count'
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
    deleteMessage(req, res) {
        message_model_1.Message.deleteMessage({
            _id: new mongodb_1.ObjectId(req.params.messageId)
        }).then(() => {
            message_model_1.Message.getUnreadCount().then((count) => {
                res.status(200).send({
                    _id: req.params.messageId,
                    unreadCount: count
                });
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    message: 'Error retrieving updated count'
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: responses_json_1.default[500]
            });
        });
    }
}
exports.default = MessageController;
