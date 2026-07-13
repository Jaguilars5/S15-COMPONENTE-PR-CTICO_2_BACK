import { CoffeeService } from "../services/CoffeeService";
import { ProductService } from "../services/ProductService";
import { CoffeeBatch } from "../models/CoffeeBatch";
import { Product } from "../models/Product";
import { User } from "../models/User";

export const resolvers = {
  Query: {
    getCurrentPrice: async () => {
      return CoffeeService.getCurrentPrice();
    },
    getPriceTrends: async () => {
      return CoffeeService.getPriceTrends();
    },
    getFarmerBatches: async (_: any, { farmerId }: { farmerId: string }) => {
      return CoffeeBatch.find({ farmer: farmerId }).sort({ createdAt: -1 });
    },
    getDashboardMetrics: async () => {
      const batches = await CoffeeBatch.find();
      const products = await Product.find();

      const totalBatchesBought = batches.length;
      const totalWeightBought = batches.reduce((acc, b) => acc + b.weight, 0);
      const totalPaidToFarmers = batches.reduce((acc, b) => acc + b.totalPrice, 0);
      const totalProductsInInventory = products.length;
      const totalProductsStock = products.reduce((acc, p) => acc + p.stock, 0);

      return {
        totalBatchesBought,
        totalWeightBought,
        totalPaidToFarmers,
        totalProductsInInventory,
        totalProductsStock
      };
    },
    getAllProducts: async () => {
      return ProductService.getAllProducts();
    }
  },
  CoffeeBatch: {
    farmer: async (parent: any) => {
      return User.findById(parent.farmer);
    }
  }
};
