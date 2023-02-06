import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async create(req: Request, res: Response) {
    const productCreated = await this.productService.create(req.body);
    res.status(201).json(productCreated);
  }

  public async getAll(_req: Request, res: Response) {
    const allProducts = await this.productService.getAll();
    res.status(200).json(allProducts);
  }
}