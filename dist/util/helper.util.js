"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_json_1 = __importDefault(require("./../config.json"));
class HelperUtil {
    static generateHash(str, cb) {
        bcrypt_1.default.hash(str, 8, (err, hash) => {
            cb(err, hash);
        });
    }
    static compareHash(password, hash, cb) {
        bcrypt_1.default.compare(password, hash, (err, same) => {
            cb(err, same);
        });
    }
    static signToken(payload, expiresIn, cb) {
        jsonwebtoken_1.default.sign(payload, config_json_1.default.jwt_key, {
            expiresIn
        }, (err, token) => {
            cb(err, token);
        });
    }
    static verifyToken(token, cb) {
        jsonwebtoken_1.default.verify(token, config_json_1.default.jwt_key, (err, decoded) => {
            cb(err, decoded);
        });
    }
    static encryptString(str) {
        return crypto_js_1.default.AES.encrypt(str, config_json_1.default.encrypt_key).toString();
    }
    static decryptString(encryptedStr) {
        const bytes = crypto_js_1.default.AES.decrypt(encryptedStr, config_json_1.default.encrypt_key);
        return bytes.toString(crypto_js_1.default.enc.Utf8);
    }
    static sendMail(email, subject, body) {
        mail_1.default.setApiKey(config_json_1.default.api_key);
        const msg = {
            to: email,
            from: config_json_1.default.from,
            subject: subject,
            html: body
        };
        return mail_1.default.send(msg);
    }
}
exports.default = HelperUtil;
