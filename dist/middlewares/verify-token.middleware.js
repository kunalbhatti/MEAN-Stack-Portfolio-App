"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const express_1 = __importDefault(require("express"));
const helper_util_1 = __importDefault(require("../util/helper.util"));
const responses_json_1 = __importDefault(require("./../responses.json"));
const app = express_1.default();
exports.verifyToken = app.use((req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (token) {
            helper_util_1.default.verifyToken(token.toString(), (err, decoded) => {
                if (err) {
                    return res.status(401).send(responses_json_1.default[401]);
                }
                next();
            });
        }
        else {
            res.status(401).send(responses_json_1.default[401]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).send(responses_json_1.default[401]);
    }
});
