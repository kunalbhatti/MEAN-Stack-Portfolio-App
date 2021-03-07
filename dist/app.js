"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_util_1 = require("./util/database.util");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const admin_controller_1 = __importDefault(require("./controllers/admin.controller"));
const content_controller_1 = __importDefault(require("./controllers/content.controller"));
const message_controller_1 = __importDefault(require("./controllers/message.controller"));
const verify_token_middleware_1 = require("./middlewares/verify-token.middleware");
const path_1 = __importDefault(require("path"));
const port = process.env.PORT || 3000;
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
    }
    initializeMiddlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            extended: false
        }));
    }
    initializeControllers() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'www')));
        this.app.use('/auth', new auth_controller_1.default().router);
        this.app.use('/admin', verify_token_middleware_1.verifyToken, new admin_controller_1.default().router);
        this.app.use('/app', new content_controller_1.default().router);
        this.app.use('/messenger', new message_controller_1.default().router);
        this.app.get('/*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, 'www', 'index.html'));
        });
    }
    listen() {
        database_util_1.connectToMongo(() => {
            this.app.listen(this.port, () => {
                this.initializeMiddlewares();
                this.initializeControllers();
                console.log(`Server listening on port ${this.port}`);
            });
        });
    }
}
exports.default = App;
new App(port).listen();
