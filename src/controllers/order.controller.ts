import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public async getAll(_req: Request, res: Response) {
    const allOrders = await this.orderService.getAll();
    res.status(200).json(allOrders);
  }

  public async addOrder(req: Request, res: Response) {
    try {
      const createdOrder = await this.orderService
        .addOrder(req.headers.authorization as string, req.body.productsIds);
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}