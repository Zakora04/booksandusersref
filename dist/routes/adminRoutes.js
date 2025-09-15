"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
// import { authMiddleware} from "../middleware/authMiddleware";
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post("/signupadmin", adminController_1.SignUpAdmin);
exports.adminRouter.post("/loginadmin", adminController_1.LoginAdmin);
// adminRouter.get("/getone/:id", GetOneAdmin);
exports.adminRouter.get("/getall", adminController_1.GetAllUsers);
exports.adminRouter.put("/update/:id", adminController_1.UpdateAdmin);
exports.adminRouter.delete("/deleteone/:id", adminController_1.deleteOneUser);
exports.adminRouter.delete("/deleteallusers", adminController_1.deleteAllUsers);
// adminRouter.delete("/deleteall", deleteAllAdmins);
//# sourceMappingURL=adminRoutes.js.map