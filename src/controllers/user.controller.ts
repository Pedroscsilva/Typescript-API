import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async create(req: Request, res: Response) {
    try {
      const token = await this.userService.create(req.body);
      res.status(201).json({ token });      
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}