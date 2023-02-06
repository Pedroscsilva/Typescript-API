import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../interfaces/user.interface';

dotenv.config();

const TOKEN_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (payload: User) => 
  jwt.sign(payload, TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

export default generateToken;
// export const authenticateToken = (token:string) => {
//   if (!token) {
//     const error = new Error('Token not found');
//     error.status = 401;
//     throw error;
//   }

//   try {
//     const verificationResponse = jwt.verify(token, TOKEN_SECRET);
//     return verificationResponse;
//   } catch (err) {
//     const error = new Error('Expired or invalid token');
//     error.status = 401;
//     throw error;
//   }
// };

// export const decodeToken = (token:string):User => {
//   const payload = jwt.decode(token);
//   return payload;
// };
