import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

const orderController = new OrderController();

router.get('/orders', (req, res) => orderController.getAll(req, res));
router.post('/orders', (req, res) => orderController.addOrder(req, res));

export default router;
