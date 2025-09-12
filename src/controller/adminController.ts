import generateToken from "../middleware/Genreate";
import { IAdmin, Adminmodel } from "../model/adminmodel";
import { Usermodel } from "../model/usermodel";
import argon2 from "argon2";
import { Request, Response } from "express";


export const SignUpAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const checkAdminExists = await Adminmodel.findOne({ email });
    if (checkAdminExists) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    const hashPassword = await argon2.hash(password);
    const createAdmin = await Adminmodel.create({
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
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

export const LoginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body as Pick<IAdmin, "email" | "password">;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const checkLogin = await Adminmodel.findOne({ email });
    if (!checkLogin) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const isMatch = await argon2.verify(checkLogin.password, password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    checkLogin.isLogin = true;
    await checkLogin.save();

   
const token = generateToken(String(checkLogin._id),checkLogin.role)

    res.status(200).json({
      message: "Login successful",
      name: checkLogin.name,
      email: checkLogin.email,
      phoneNumber: checkLogin.phoneNumber,
      role: checkLogin.role,
      token
    });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

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

export const GetAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getAllUsers = await Usermodel.find().populate("books");

    if (getAllUsers.length === 0) {
      res.status(404).json({ message: "Users not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Users gotten successfully", data: getAllUsers });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

export const UpdateAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, phoneNumber } = req.body as Partial<IAdmin>;

    const updateData: Record<string, any> = { name, email, phoneNumber };
    if (password) {
      updateData.password = await argon2.hash(password);
    }

    const updateAdmin = await Adminmodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updateAdmin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Admin updated successfully", data: updateAdmin });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

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

export const deleteOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleteOneUser = await Usermodel.findByIdAndDelete(req.params.id);
    if (!deleteOneUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

export const deleteAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleteResult = await Usermodel.deleteMany();

    if (deleteResult.deletedCount === 0) {
      res.status(404).json({ message: "No users found to delete" });
      return;
    }

    res.status(200).json({
      message: "Users deleted successfully",
      deletedCount: deleteResult.deletedCount,
    });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};
