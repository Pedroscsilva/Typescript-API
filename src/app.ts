import express from 'express';
import ProductsRoutes from './routes/products.routes';
import UserRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

app.use(ProductsRoutes);
app.use(UserRoutes);

export default app;
