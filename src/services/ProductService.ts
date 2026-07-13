import { Product, IProduct } from "../models/Product";

export class ProductService {
  public static async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(productData);
    return product.save();
  }

  public static async getAllProducts(): Promise<IProduct[]> {
    return Product.find().sort({ createdAt: -1 });
  }

  public static async getProductById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  public static async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
  }

  public static async deleteProduct(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id);
  }
}
