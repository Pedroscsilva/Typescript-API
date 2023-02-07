import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginReturn, User } from '../interfaces/user.interface';
import ErrorWithStatus from './ErrorWithStatus';

dotenv.config();

const TOKEN_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: User | LoginReturn) => 
  jwt.sign(payload, TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

export const authenticateToken = (token:string) => {
  if (!token) throw new ErrorWithStatus('Token not found', 401);

  try {
    const verificationResponse = jwt.verify(token, TOKEN_SECRET);
    return verificationResponse;
  } catch (err) {
    throw new ErrorWithStatus('Invalid token', 401);
  }
};

export const decodeToken = (token:string) => {
  const payload = jwt.decode(token);
  return payload as LoginReturn;
};
