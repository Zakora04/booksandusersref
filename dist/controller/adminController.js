"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteOneUser = exports.UpdateAdmin = exports.GetAllUsers = exports.LoginAdmin = exports.SignUpAdmin = void 0;
const Genreate_1 = __importDefault(require("../middleware/Genreate"));
const adminmodel_1 = require("../model/adminmodel");
const usermodel_1 = require("../model/usermodel");
const argon2_1 = __importDefault(require("argon2"));
const SignUpAdmin = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        if (!name || !email || !password || !phoneNumber) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkAdminExists = await adminmodel_1.Adminmodel.findOne({ email });
        if (checkAdminExists) {
            res.status(400).json({ message: "Admin already exists" });
            return;
        }
        const hashPassword = await argon2_1.default.hash(password);
        const createAdmin = await adminmodel_1.Adminmodel.create({
            name,
            email,
            password: hashPassword,
            phoneNumber,
            role: "admin",
            isLogin: false,
        });
        res
            .status(201)
            .json({ message: "Admin created successfully", data: createAdmin });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.SignUpAdmin = SignUpAdmin;
const LoginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkLogin = await adminmodel_1.Adminmodel.findOne({ email });
        if (!checkLogin) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }
        const isMatch = await argon2_1.default.verify(checkLogin.password, password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        checkLogin.isLogin = true;
        await checkLogin.save();
        const token = (0, Genreate_1.default)(String(checkLogin._id), checkLogin.role);
        res.status(200).json({
            message: "Login successful",
            name: checkLogin.name,
            email: checkLogin.email,
            phoneNumber: checkLogin.phoneNumber,
            role: checkLogin.role,
            token
        });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.LoginAdmin = LoginAdmin;
// export const GetOneAdmin = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const getOneAdmin = await Adminmodel.findById(id);
//     if (!getOneAdmin) {
//       res.status(404).json({ message: "Admin not found" });
//       return;
//     }
//     res
//       .status(200)
//       .json({ message: "Admin gotten successfully", data: getOneAdmin });
//   } catch (err: any) {
//     res.status(500).json({ message: "An error occurred", err: err.message });
//   }
// };
const GetAllUsers = async (req, res) => {
    try {
        const getAllUsers = await usermodel_1.Usermodel.find().populate("books");
        if (getAllUsers.length === 0) {
            res.status(404).json({ message: "Users not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Users gotten successfully", data: getAllUsers });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.GetAllUsers = GetAllUsers;
const UpdateAdmin = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const updateData = { name, email, phoneNumber };
        if (password) {
            updateData.password = await argon2_1.default.hash(password);
        }
        const updateAdmin = await adminmodel_1.Adminmodel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updateAdmin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Admin updated successfully", data: updateAdmin });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.UpdateAdmin = UpdateAdmin;
// export const deleteAllAdmins = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deleteResult = await Adminmodel.deleteMany();
//     if (deleteResult.deletedCount === 0) {
//       res.status(404).json({ message: "No admins found to delete" });
//       return;
//     }
//     res.status(200).json({
//       message: "Admins deleted successfully",
//       deletedCount: deleteResult.deletedCount,
//     });
//   } catch (err: any) {
//     res.status(500).json({ message: "An error occurred", err: err.message });
//   }
// };
const deleteOneUser = async (req, res) => {
    try {
        const deleteOneUser = await usermodel_1.Usermodel.findByIdAndDelete(req.params.id);
        if (!deleteOneUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.deleteOneUser = deleteOneUser;
const deleteAllUsers = async (req, res) => {
    try {
        const deleteResult = await usermodel_1.Usermodel.deleteMany();
        if (deleteResult.deletedCount === 0) {
            res.status(404).json({ message: "No users found to delete" });
            return;
        }
        res.status(200).json({
            message: "Users deleted successfully",
            deletedCount: deleteResult.deletedCount,
        });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.deleteAllUsers = deleteAllUsers;
//# sourceMappingURL=adminController.js.map