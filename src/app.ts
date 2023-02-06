import express from 'express';
import ProductsRoutes from './routes/products.routes';
import UserRoutes from './routes/user.routes';
import OrdersRouter from './routes/orders.routes';

const app = express();

app.use(express.json());

app.use(ProductsRoutes);
app.use(UserRoutes);
app.use(OrdersRouter);

export default app;
