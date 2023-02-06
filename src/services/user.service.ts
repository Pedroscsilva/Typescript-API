import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import generateToken from '../utils/JWTutils';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<object> {
    await this.model.create(user);
    const token = generateToken(user);

    return { token };
  }
}