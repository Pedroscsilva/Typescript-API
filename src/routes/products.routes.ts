// ./routes/books.routes.ts

import { Router } from 'express';
import ProductController from '../controllers/product.controller';
// import validationBook from '../middlewares/books.middleware';

const router = Router();

const productController = new ProductController();

router.post('/products', productController.create);

export default router;
