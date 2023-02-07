import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';
import { authenticateToken, decodeToken } from '../utils/JWTutils';
import ErrorWithStatus from '../utils/ErrorWithStatus';
import { productIdsSchema } from '../utils/JoiSchemas';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public getAll(): Promise<Order[]> {
    return this.model.getAll();
  }

  public async addOrder(userToken: string, productsIds: Array<number>): Promise<Order> {
    authenticateToken(userToken);

    const { error } = productIdsSchema.validate({ productsIds });
    if (error) {
      const errorType = error.details[0].type === 'any.required' ? 400 : 422;
      throw new ErrorWithStatus(error.message, errorType);
    }
  
    const { id } = decodeToken(userToken);
    const result = await this.model.addOrder(id, productsIds);
    return result;
  }
}