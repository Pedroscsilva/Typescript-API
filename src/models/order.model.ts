import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT orders.id, orders.user_id AS userId, JSON_ARRAYAGG(products.id) AS productsIds 
      FROM Trybesmith.orders 
      INNER JOIN Trybesmith.products ON orders.id = products.order_id 
      GROUP BY orders.id`,
    );
    const [rows] = result;
    return rows as Order[];
  }

  public async addOrder(userId: number, productsIds: Array<number>): Promise<Order> {
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [userId],
    );
    const { insertId } = dataInserted;
    productsIds.forEach(async (productId) => {
      await this.connection.execute(
        `UPDATE Trybesmith.products 
        SET order_id=? WHERE id=?`,
        [insertId, productId],
      );
    });
    return { userId, productsIds };
  }
}
