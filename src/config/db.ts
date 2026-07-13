import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/coffeeshop";
    await mongoose.connect(connUri);
  } catch (error) {
    process.exit(1);
  }
};
