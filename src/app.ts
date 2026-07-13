import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import coffeeRoutes from "./routes/coffeeRoutes";
import { errorHandler } from "./middleware/error";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/coffee", coffeeRoutes);

app.use(errorHandler);

export default app;
