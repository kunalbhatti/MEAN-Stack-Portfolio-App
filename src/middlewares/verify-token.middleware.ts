import express from "express";

import HelperUtil from "../util/helper.util";
import responseCode from "./../responses.json";

const app = express();
export const verifyToken = app.use(
    (req, res, next) => {
        try{
            const token = req.headers['x-access-token'];

            if(token){
                HelperUtil.verifyToken(token.toString(), (err, decoded) => {
                    if (err) {
                        return res.status(401).send(responseCode[401]);
                    }
                    next();
                })
            } else {
                res.status(401).send(responseCode[401]);
            }
        } catch (err) {
            console.log(err)
            res.status(401).send(responseCode[401]);
        }
        
    });