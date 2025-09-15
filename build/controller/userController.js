"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.GetOne = exports.CreateBook = exports.LoginUser = exports.SignUp = void 0;
const usermodel_1 = require("../model/usermodel");
const bookmodel_1 = require("../model/bookmodel");
const argon2_1 = __importDefault(require("argon2"));
const Genreate_1 = __importDefault(require("../middleware/Genreate"));
const SignUp = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        if (!name || !email || !password || !phoneNumber) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkUserExists = await usermodel_1.Usermodel.findOne({ email });
        if (checkUserExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashPassword = await argon2_1.default.hash(password);
        const createUser = await usermodel_1.Usermodel.create({
            name,
            email,
            password: hashPassword,
            phoneNumber,
            isLogin: false,
        });
        res
            .status(201)
            .json({ message: "User created successfully", data: createUser });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.SignUp = SignUp;
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkLogin = await usermodel_1.Usermodel.findOne({ email });
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
            password: checkLogin.password,
            phoneNumber: checkLogin.phoneNumber
        });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.LoginUser = LoginUser;
const CreateBook = async (req, res) => {
    try {
        const { seller, title, author, yearPublished, category } = req.body;
        if (!seller || !title || !author || !yearPublished || !category) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const sellerExists = await usermodel_1.Usermodel.findById(seller);
        if (!sellerExists) {
            res.status(404).json({ message: "Seller not found" });
            return;
        }
        const createBook = await bookmodel_1.BookModel.create({
            title,
            author,
            seller,
            yearPublished,
            category,
        });
        const updatedUser = await usermodel_1.Usermodel.findByIdAndUpdate(seller, { $push: { books: createBook._id } }, { new: true }).populate("books");
        res.status(201).json({
            message: "Book created and associated with user successfully",
            data: {
                book: createBook,
                user: updatedUser,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.CreateBook = CreateBook;
const GetOne = async (req, res) => {
    try {
        const { id } = req.params;
        const getOneUser = await usermodel_1.Usermodel.findById(id).populate("books");
        if (!getOneUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "User gotten successfully", data: getOneUser });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.GetOne = GetOne;
// export const GetAll = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const getAllUsers = await Usermodel.find().populate("books");
//     if (getAllUsers.length === 0) {
//       res.status(404).json({ message: "Users not found" });
//       return;
//     }
//     res
//       .status(200)
//       .json({ message: "Users gotten successfully", data: getAllUsers });
//   } catch (err: any) {
//     res.status(500).json({ message: "An error occurred", err: err.message });
//   }
// };
const UpdateUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const updateData = { name, email, phoneNumber };
        if (password) {
            updateData.password = await argon2_1.default.hash(password);
        }
        const updateUser = await usermodel_1.Usermodel.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("books");
        if (!updateUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "User updated successfully", data: updateUser });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.UpdateUser = UpdateUser;
// export const deleteAll = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deleteResult = await Usermodel.deleteMany();
//     if (deleteResult.deletedCount === 0) {
//       res.status(404).json({ message: "No users found to delete" });
//       return;
//     }
//     res.status(200).json({
//       message: "Users deleted successfully",
//       deletedCount: deleteResult.deletedCount,
//     });
//   } catch (err: any) {
//     res.status(500).json({ message: "An error occurred", err: err.message });
//   }
// };
// export const deleteOne = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deleteOneUser = await Usermodel.findByIdAndDelete(req.params.id);
//     if (!deleteOneUser) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err: any) {
//     res.status(500).json({ message: "An error occurred", err: err.message });
//   }
// };
//# sourceMappingURL=userController.js.map