import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  origin: string;
  price: number;
  stock: number;
  roastLevel: "LIGHT" | "MEDIUM" | "DARK";
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    origin: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    roastLevel: { type: String, required: true, enum: ["LIGHT", "MEDIUM", "DARK"] }
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
