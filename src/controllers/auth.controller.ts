import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async authUser(req: Request, res: Response) {
    try {
      const token = await this.authService.authenticateUser(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}