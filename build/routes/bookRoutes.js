"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post("/signupbook", bookController_1.Createbook);
exports.bookRouter.get("/getonebook/:id", bookController_1.GetOneBook);
//# sourceMappingURL=bookRoutes.js.map