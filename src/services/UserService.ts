import { Document } from "mongoose";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { JWT_CONFIG, ERRORS } from "../config/constants";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "FARMER" | "BRAND";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export class UserService {
  public static async register(userData: Partial<IUser>): Promise<IUser> {
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
      throw new Error(ERRORS.EMAIL_REGISTERED);
    }
    const user = new User(userData);
    return user.save();
  }

  public static async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(ERRORS.INVALID_CREDENTIALS);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error(ERRORS.INVALID_CREDENTIALS);
    }
    
    const secret = process.env.JWT_SECRET || "supersecretkeyforcoffeeshopmvp12345";
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      secret,
      { expiresIn: JWT_CONFIG.ACCESS_EXPIRES }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, type: "refresh" },
      secret,
      { expiresIn: JWT_CONFIG.REFRESH_EXPIRES }
    );
    
    return { user, accessToken, refreshToken };
  }

  public static async refresh(token: string): Promise<{ accessToken: string }> {
    try {
      const secret = process.env.JWT_SECRET || "supersecretkeyforcoffeeshopmvp12345";
      const decoded = jwt.verify(token, secret) as { userId: string; type: string };
      if (decoded.type !== "refresh") {
        throw new Error(ERRORS.INVALID_TOKEN);
      }
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error(ERRORS.INVALID_TOKEN);
      }
      const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        secret,
        { expiresIn: JWT_CONFIG.ACCESS_EXPIRES }
      );
      return { accessToken };
    } catch (err) {
      throw new Error(ERRORS.INVALID_TOKEN);
    }
  }

  public static async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }
}
