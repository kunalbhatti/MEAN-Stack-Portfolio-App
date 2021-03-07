"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVideo = exports.saveImage = void 0;
const multer_1 = __importDefault(require("multer"));
exports.saveImage = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './dist/images');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});
exports.saveVideo = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './dist/videos');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});
