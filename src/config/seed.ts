import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/User";
import { CoffeeBatch } from "../models/CoffeeBatch";
import { PriceTrend } from "../models/PriceTrend";
import { Product } from "../models/Product";
import { connectDB } from "./db";

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await CoffeeBatch.deleteMany({});
    await PriceTrend.deleteMany({});
    await Product.deleteMany({});

    const farmer = new User({
      name: "Juan Agricultor",
      email: "agricultor@example.com",
      password: "password123",
      role: "FARMER"
    });
    await farmer.save();

    const brand = new User({
      name: "Café Oro S.A.",
      email: "marca@example.com",
      password: "password123",
      role: "BRAND"
    });
    await brand.save();

    const today = new Date();
    const prices = [3.80, 4.10, 3.95, 4.25, 4.50];
    const trends = [];
    for (let i = 0; i < prices.length; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (prices.length - 1 - i));
      const trend = await PriceTrend.create({ date, price: prices[i] });
      trends.push(trend);
    }

    const batch1 = await CoffeeBatch.create({
      farmer: farmer._id,
      variety: "Arabica",
      weight: 120.0,
      pricePerKg: 4.50,
      totalPrice: 540.0,
      status: "PROCESSED"
    });

    const batch2 = await CoffeeBatch.create({
      farmer: farmer._id,
      variety: "Gesha",
      weight: 85.0,
      pricePerKg: 4.50,
      totalPrice: 382.5,
      status: "PENDING"
    });

    const batch3 = await CoffeeBatch.create({
      farmer: farmer._id,
      variety: "Robusta",
      weight: 150.0,
      pricePerKg: 4.50,
      totalPrice: 675.0,
      status: "PROCESSED"
    });

    await Product.create({
      name: "Café Premium Orgánico",
      description: "Café en grano premium de origen orgánico con tostado medio balanceado.",
      origin: "Loja, Ecuador",
      price: 18.50,
      stock: 50,
      roastLevel: "MEDIUM"
    });

    await Product.create({
      name: "Gesha Selección Especial",
      description: "Edición limitada de variedad Gesha cosechada a gran altura con notas florales.",
      origin: "Zaruma, Ecuador",
      price: 32.00,
      stock: 25,
      roastLevel: "LIGHT"
    });

    await Product.create({
      name: "Espresso Intenso",
      description: "Mezcla de granos seleccionados con tostado oscuro ideal para espresso.",
      origin: "Manabí, Ecuador",
      price: 14.90,
      stock: 100,
      roastLevel: "DARK"
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

seedDatabase();
