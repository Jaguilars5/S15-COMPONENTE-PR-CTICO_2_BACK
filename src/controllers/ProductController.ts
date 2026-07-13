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

  public static async buyProducts(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { items } = req.body;
      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: "Debe proporcionar una lista de productos para comprar" });
        return;
      }

      const productsToUpdate = [];
      for (const item of items) {
        const product = await ProductService.getProductById(item.productId);
        if (!product) {
          res.status(404).json({ error: `Producto no encontrado` });
          return;
        }
        if (product.stock < item.quantity) {
          res.status(400).json({ error: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}` });
          return;
        }
        productsToUpdate.push({ product, quantity: item.quantity });
      }

      for (const { product, quantity } of productsToUpdate) {
        product.stock -= quantity;
        await product.save();
      }

      res.status(200).json({ message: "Compra realizada con éxito" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
