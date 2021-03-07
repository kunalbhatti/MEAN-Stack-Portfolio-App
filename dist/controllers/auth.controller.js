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
const user_model_1 = require("./../models/user.model");
const helper_util_1 = __importDefault(require("./../util/helper.util"));
const responses_json_1 = __importDefault(require("./../responses.json"));
const verify_token_middleware_1 = require("../middlewares/verify-token.middleware");
class AuthController {
    constructor() {
        this._router = express.Router();
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.post('/check-auth-status', verify_token_middleware_1.verifyToken, this.checkAuthStatus);
    }
    get router() {
        return this._router;
    }
    register(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const role = 'subscriber';
        user_model_1.User.findUser({
            email
        }).then((user) => {
            if (user) {
                res.status(409).send({
                    registered: false,
                    message: responses_json_1.default[409]
                });
                return;
            }
            else {
                helper_util_1.default.generateHash(password, (err, hash) => {
                    if (err) {
                        res.status(500).send({
                            registered: false,
                            message: responses_json_1.default[500]
                        });
                        return;
                    }
                    const userData = {
                        name,
                        email,
                        password: hash,
                        role
                    };
                    user_model_1.User.register(userData).then(user => {
                        res.status(200).send({
                            registered: true,
                            message: 'User registered successfully'
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({
                            registered: false,
                            message: responses_json_1.default[500]
                        });
                    });
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send(responses_json_1.default[500]);
        });
    }
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        user_model_1.User.findUser({
            email
        }).then((user) => {
            if (!user) {
                res.status(404).send({
                    auth: false,
                    message: 'Invalid Email/Password'
                });
                return;
            }
            const hash = user.password;
            helper_util_1.default.compareHash(password, hash, (err, same) => {
                if (err) {
                    res.status(500).send({
                        auth: false,
                        message: responses_json_1.default[500]
                    });
                    return;
                }
                if (same) {
                    helper_util_1.default.signToken({
                        id: user._id,
                    }, 86400, (err, token) => {
                        if (err) {
                            res.status(500).send({
                                auth: false,
                                message: responses_json_1.default[500]
                            });
                            return;
                        }
                        res.status(200).send({
                            auth: true,
                            token
                        });
                    });
                }
                else {
                    res.status(401).send({
                        auth: false,
                        message: 'Invalid Email/Password'
                    });
                }
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({
                auth: false,
                message: responses_json_1.default[500]
            });
        });
    }
    checkAuthStatus(req, res) {
        res.status(200).send({
            auth: true,
            message: 'User is authenticated'
        });
    }
}
exports.default = AuthController;
