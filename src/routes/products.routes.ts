// ./routes/books.routes.ts

import { Router } from 'express';
import ProductController from '../controllers/product.controller';
// import validationBook from '../middlewares/books.middleware';

const router = Router();

const productController = new ProductController();

router.post('/products', (req, res) => productController.create(req, res));
router.get('/products', (req, res) => productController.getAll(req, res));

export default router;
