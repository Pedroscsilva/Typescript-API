import connection from '../models/connection';
import UserModel from '../models/user.model';
import { User } from '../interfaces/user.interface';
import generateToken from '../utils/JWTutils';
import { userSchema } from '../utils/JoiSchemas';
import ErrorWithStatus from '../utils/ErrorWithStatus';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<string> {
    const { error } = userSchema.validate(user);
    if (error) {
      const errorType = error.details[0].type === 'any.required' ? 400 : 422;
      const newError = new ErrorWithStatus(error.message, errorType);
      throw newError;
    }
    
    await this.model.create(user);
    const token = generateToken(user);

    return token;
  }
}