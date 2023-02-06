import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public create = async (req: Request, res: Response) => {
    const productCreated = await this.productService.create(req.body);
    res.status(201).json(productCreated);
  };
}