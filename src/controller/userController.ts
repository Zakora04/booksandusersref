import { IUser, Usermodel } from "../model/usermodel";
import { BookModel } from "../model/bookmodel";
import argon2 from "argon2";
import { Request, Response } from "express";
import generateToken from "../middleware/Genreate";

export const SignUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }


    const checkUserExists = await Usermodel.findOne({ email });
    if (checkUserExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashPassword = await argon2.hash(password);
    const createUser = await Usermodel.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      isLogin: false,
    });

    res
      .status(201)
      .json({ message: "User created successfully", data: createUser });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};


export const LoginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as Pick<IUser, "email" | "password">;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const checkLogin = await Usermodel.findOne({ email });
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

    const token = generateToken(String(checkLogin._id), checkLogin.role)

    res.status(200).json({
      message: "Login successful",
      name: checkLogin.name,
      email: checkLogin.email,
      phoneNumber: checkLogin.phoneNumber,
      token

    });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

export const CreateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { seller, title, author, yearPublished, category } = req.body;

    if (!seller || !title || !author || !yearPublished || !category) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    
    const sellerExists = await Usermodel.findById(seller);
    if (!sellerExists) {
      res.status(404).json({ message: "Seller not found" });
      return;
    }


    const createBook = await BookModel.create({
      title,
      author,
      seller,
      yearPublished,
      category,
    });

 
    const updatedUser = await Usermodel.findByIdAndUpdate(
      seller,
      { $push: { books: createBook._id } },
      { new: true }
    ).populate("books");

    res.status(201).json({
      message: "Book created and associated with user successfully",
      data: {
        book: createBook,
        user: updatedUser,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

export const GetOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const getOneUser = await Usermodel.findById(id).populate("books");

    if (!getOneUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User gotten successfully", data: getOneUser });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

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

export const UpdateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, phoneNumber } = req.body as Partial<IUser>;

   
    const updateData: Record<string, any> = { name, email, phoneNumber };
    if (password) {
      updateData.password = await argon2.hash(password);
    }

    const updateUser = await Usermodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("books");

    if (!updateUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User updated successfully", data: updateUser });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

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
