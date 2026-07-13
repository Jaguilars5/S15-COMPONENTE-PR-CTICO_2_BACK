import { CoffeeBatch, ICoffeeBatch } from "../models/CoffeeBatch";
import { PriceTrend, IPriceTrend } from "../models/PriceTrend";

export class CoffeeService {
  public static async getCurrentPrice(): Promise<number> {
    const latest = await PriceTrend.findOne().sort({ date: -1 });
    return latest ? latest.price : 2.5;
  }

  public static async sellBatch(
    farmerId: string,
    variety: string,
    weight: number
  ): Promise<ICoffeeBatch> {
    const currentPrice = await this.getCurrentPrice();
    const totalPrice = weight * currentPrice;
    const batch = new CoffeeBatch({
      farmer: farmerId,
      variety,
      weight,
      pricePerKg: currentPrice,
      totalPrice,
      status: "PENDING"
    });
    return batch.save();
  }

  public static async getBatchesByFarmer(farmerId: string): Promise<ICoffeeBatch[]> {
    return CoffeeBatch.find({ farmer: farmerId }).sort({ createdAt: -1 });
  }

  public static async getAllBatches(): Promise<ICoffeeBatch[]> {
    return CoffeeBatch.find().populate("farmer", "name email").sort({ createdAt: -1 });
  }

  public static async getPriceTrends(): Promise<IPriceTrend[]> {
    return PriceTrend.find().sort({ date: 1 });
  }

  public static async addPriceTrend(price: number, date: Date = new Date()): Promise<IPriceTrend> {
    const trend = new PriceTrend({ date, price });
    return trend.save();
  }
}
