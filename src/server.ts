import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { PriceTrend } from "./models/PriceTrend";

const startServer = async (): Promise<void> => {
  await connectDB();

  const count = await PriceTrend.countDocuments();
  if (count === 0) {
    const today = new Date();
    const prices = [2.1, 2.3, 2.2, 2.5, 2.4, 2.6, 2.7];
    for (let i = 0; i < prices.length; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (prices.length - 1 - i));
      await PriceTrend.create({ date, price: prices[i] });
    }
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server) as any);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((err) => {
  process.exit(1);
});
