import { Pool, ResultSetHeader } from 'mysql2/promise';
import { User, UserLogin, LoginReturn } from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<void> {
    const { username, vocation, level, password } = user;
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
  }

  public async findUser(userObject: UserLogin): Promise<LoginReturn[]> {
    const { username, password } = userObject;
    const [rows] = await this.connection.execute(
      'SELECT * FROM Trybesmith.users WHERE username=? AND password=?',
      [username, password],
    );
    return rows as LoginReturn[];
  }
}