export interface User { 
  id?: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface LoginReturn {
  username: string;
  id: number;
}