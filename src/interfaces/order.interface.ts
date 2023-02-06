interface Order {
  id?: number;
  userId: number;
  productsIds: Array<number>;
}

export default Order;
