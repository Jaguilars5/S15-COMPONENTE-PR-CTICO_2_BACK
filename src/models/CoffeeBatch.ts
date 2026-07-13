import { Schema, model, Document, Types } from "mongoose";

export interface ICoffeeBatch extends Document {
  farmer: Types.ObjectId;
  variety: string;
  weight: number;
  pricePerKg: number;
  totalPrice: number;
  status: "PENDING" | "PROCESSED";
  createdAt: Date;
  updatedAt: Date;
}

const coffeeBatchSchema = new Schema<ICoffeeBatch>(
  {
    farmer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    variety: { type: String, required: true },
    weight: { type: Number, required: true },
    pricePerKg: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ["PENDING", "PROCESSED"], default: "PENDING" }
  },
  { timestamps: true }
);

export const CoffeeBatch = model<ICoffeeBatch>("CoffeeBatch", coffeeBatchSchema);
