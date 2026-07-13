import { Schema, model, Document } from "mongoose";

export interface IPriceTrend extends Document {
  date: Date;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const priceTrendSchema = new Schema<IPriceTrend>(
  {
    date: { type: Date, required: true, unique: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export const PriceTrend = model<IPriceTrend>("PriceTrend", priceTrendSchema);
