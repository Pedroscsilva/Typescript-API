import connection from '../models/connection';
import UserModel from '../models/user.model';
import { UserLogin } from '../interfaces/user.interface';
import generateToken from '../utils/JWTutils';
import { loginSchema } from '../utils/JoiSchemas';
import ErrorWithStatus from '../utils/ErrorWithStatus';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  async authenticateUser(loginObject: UserLogin) {
    const { error } = loginSchema.validate(loginObject);
    if (error) {
      const newError = new ErrorWithStatus(error.message, 400);
      throw newError;
    }

    const result = await this.model.findUser(loginObject);

    if (result.length === 0) {
      const newError = new ErrorWithStatus('Username or password invalid', 401);
      throw newError;
    }

    const token = generateToken({
      id: result[0].id,
      username: result[0].username,
    });

    return token;
  }
}