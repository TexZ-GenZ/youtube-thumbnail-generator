export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface Visualization {
  id: string;
  title: string;
  description: string;
  prompt: string;
  status: 'processing' | 'completed' | 'failed';
  output?: string;
  createdAt: Date;
  userId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}