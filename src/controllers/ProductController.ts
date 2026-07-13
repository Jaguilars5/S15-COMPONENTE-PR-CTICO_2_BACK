import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import { ProductService } from "../services/ProductService";
import { ERRORS } from "../config/constants";

export class ProductController {
  public static async createProduct(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description, origin, price, stock, roastLevel } = req.body;
      if (!name || !description || !origin || price === undefined || stock === undefined || !roastLevel) {
        res.status(400).json({ error: ERRORS.MISSING_PRODUCT_FIELDS });
        return;
      }
      const product = await ProductService.createProduct({
        name,
        description,
        origin,
        price,
        stock,
        roastLevel
      });
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async getAllProducts(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async getProductById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ error: ERRORS.PRODUCT_NOT_FOUND });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async updateProduct(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      if (!product) {
        res.status(404).json({ error: ERRORS.PRODUCT_NOT_FOUND });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async deleteProduct(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      if (!product) {
        res.status(404).json({ error: ERRORS.PRODUCT_NOT_FOUND });
        return;
      }
      res.status(200).json({ message: ERRORS.PRODUCT_DELETED });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
