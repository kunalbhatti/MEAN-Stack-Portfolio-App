import * as express from 'express';
import {
    User,
    UserModel
} from './../models/user.model';

import HelperUtil from './../util/helper.util';
import responseCode from './../responses.json';
import {
    verifyToken
} from '../middlewares/verify-token.middleware';

export default class AuthController {
    private _router: express.Router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.post('/check-auth-status', verifyToken, this.checkAuthStatus);
    }

    private register(req: express.Request, res: express.Response): void {

        const email: string = req.body.email;
        const password: string = req.body.password;
        const name: string = req.body.name;
        const role: string = 'subscriber';

        User.findUser({
            email
        }).then(
            (user: UserModel) => {
                if (user) {
                    res.status(409).send({
                        registered: false,
                        message: responseCode[409]
                    });
                    return;
                } else {
                    HelperUtil.generateHash(password, (err: Error, hash: string) => {
                        if (err) {
                            res.status(500).send({
                                registered: false,
                                message: responseCode[500]
                            });
                            return;
                        }

                        const userData: UserModel = {
                            name,
                            email,
                            password: hash,
                            role
                        };

                        User.register(userData).then(
                            user => {
                                res.status(200).send({
                                    registered: true,
                                    message: 'User registered successfully'
                                });
                            }
                        ).catch(error => {
                            console.log(error);
                            res.status(500).send({
                                registered: false,
                                message: responseCode[500]
                            });
                        });
                    });
                }
            }
        ).catch(error => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });


    }

    private login(req: express.Request, res: express.Response): void {

        const email: string = req.body.email;
        const password: string = req.body.password;

        User.findUser({
            email
        }).then(
            (user: UserModel) => {
                if (!user) {
                    res.status(404).send({
                        auth: false,
                        message: 'Invalid Email/Password'
                    });
                    return;
                }
                const hash = user.password;
                HelperUtil.compareHash(password, hash, (err: Error, same: boolean) => {
                    if (err) {
                        res.status(500).send({
                            auth: false,
                            message: responseCode[500]
                        });
                        return;
                    }
                    if (same) {
                        HelperUtil.signToken({
                            id: user._id,

                        }, 86400, (err: Error, token: string) => {
                            if (err) {
                                res.status(500).send({
                                    auth: false,
                                    message: responseCode[500]
                                });
                                return;
                            }

                            res.status(200).send({
                                auth: true,
                                token
                            });
                        });
                    } else {
                        res.status(401).send({
                            auth: false,
                            message: 'Invalid Email/Password'
                        });
                    }
                });
            }
        ).catch(error => {
            console.log(error);
            res.status(500).send({
                auth: false,
                message: responseCode[500]
            });
        });
    }

    private checkAuthStatus(req: express.Request, res: express.Response): void {
        res.status(200).send({
            auth: true,
            message: 'User is authenticated'
        });
    }

}