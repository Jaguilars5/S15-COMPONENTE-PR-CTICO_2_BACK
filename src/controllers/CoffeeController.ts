import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import { CoffeeService } from "../services/CoffeeService";
import { ERRORS } from "../config/constants";

export class CoffeeController {
  public static async getCurrentPrice(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const price = await CoffeeService.getCurrentPrice();
      res.status(200).json({ price });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async sellBatch(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { variety, weight } = req.body;
      if (!variety || weight === undefined || weight <= 0) {
        res.status(400).json({ error: ERRORS.INVALID_VARIETY_WEIGHT });
        return;
      }
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: ERRORS.UNAUTHORIZED });
        return;
      }
      const batch = await CoffeeService.sellBatch(req.user.userId, variety, weight);
      res.status(201).json(batch);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async getMyBatches(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: ERRORS.UNAUTHORIZED });
        return;
      }
      const batches = await CoffeeService.getBatchesByFarmer(req.user.userId);
      res.status(200).json(batches);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async getAllBatches(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const batches = await CoffeeService.getAllBatches();
      res.status(200).json(batches);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async getPriceTrends(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const trends = await CoffeeService.getPriceTrends();
      res.status(200).json(trends);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async addPriceTrend(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { price, date } = req.body;
      if (price === undefined || price <= 0) {
        res.status(400).json({ error: ERRORS.INVALID_PRICE });
        return;
      }
      const trend = await CoffeeService.addPriceTrend(price, date ? new Date(date) : new Date());
      res.status(201).json(trend);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
