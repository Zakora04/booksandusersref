"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", userController_1.SignUp);
exports.userRouter.post("/login", userController_1.LoginUser);
exports.userRouter.post("/createbook", authMiddleware_1.authMiddleware, userController_1.CreateBook);
exports.userRouter.get("/getone/:id", authMiddleware_1.authMiddleware, userController_1.GetOne);
//# sourceMappingURL=userRoutes.js.map