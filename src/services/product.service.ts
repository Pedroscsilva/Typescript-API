import connection from '../models/connection';
import ProductModel from '../models/product.model';
import Product from '../interfaces/product.interface';
import ErrorWithStatus from '../utils/ErrorWithStatus';
import { productSchema } from '../utils/JoiSchemas';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(product: Product): Promise<Product> {
    const { error } = productSchema.validate(product);
    if (error) {
      const errorType = error.details[0].type === 'any.required' ? 400 : 422;
      const newError = new ErrorWithStatus(error.message, errorType);
      throw newError;
    }

    return this.model.create(product);
  }

  public getAll(): Promise<Product[]> {
    return this.model.getAll();
  }
}