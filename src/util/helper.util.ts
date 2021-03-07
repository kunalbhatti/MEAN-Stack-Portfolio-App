import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import MailService from '@sendgrid/mail';

import config from './../config.json';

export default class HelperUtil {
    static generateHash(str: string, cb: (err: Error, hash: string) => void) {
        bcrypt.hash(str, 8,
            (err: Error, hash: string) => {
                cb(err, hash);
            })
    }

    static compareHash(password: string, hash: string, cb: (err: Error, same: boolean) => void) {
        bcrypt.compare(password, hash,
            (err: Error, same: boolean) => {
                cb(err, same);
            })
    }

    static signToken(payload: any, expiresIn: number, cb: (err: Error, token: string) => void) {
        jwt.sign(payload, config.jwt_key, {
            expiresIn
        }, (err: Error, token: string) => {
            cb(err, token);
        })
    }

    static verifyToken(token: string, cb: (err: Error, decoded: any) => void) {
        jwt.verify(token, config.jwt_key,
            (err: Error, decoded: any) => {
                cb(err, decoded);
            })
    }

    static encryptString(str: string): string {
        return CryptoJS.AES.encrypt(str, config.encrypt_key).toString();
    }

    static decryptString(encryptedStr: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedStr, config.encrypt_key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    static sendMail(
        email: string,
        subject: string,
        body: string): Promise < any > {
        MailService.setApiKey(config.api_key);

        const msg = {
            to: email,
            from: config.from,
            subject: subject,
            html: body
        }

        return MailService.send(msg);
    }

}