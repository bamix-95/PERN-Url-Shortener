export interface User {
  id: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: { path: string[]; message: string }[];
}
