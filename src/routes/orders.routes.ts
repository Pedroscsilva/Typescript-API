import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

const orderController = new OrderController();

router.get('/orders', (req, res) => orderController.getAll(req, res));

export default router;
