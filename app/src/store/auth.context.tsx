import React, { useState } from 'react';
import { User } from '../models/User.model';

interface AuthContextData {
  token: string;
  user?: User;
  isLoggedIn: boolean;
  isRestaurantOwner: boolean;
  getUserId: () => string;
  login: (token: string) => any;
  logout: () => any;
}

const data: AuthContextData = {
  token: '',
  user: {
    id: '',
    email: '',
    role: '',
  },
  isLoggedIn: false,
  isRestaurantOwner: false,
  getUserId: () => '',
  login: (token: string) => {},
  logout: () => {},
};

const AuthContext = React.createContext<AuthContextData>(data);

export const AuthContextProvider = (props: any) => {
  const currentToken = localStorage.getItem('token') || '';
  const [token, setToken] = useState(currentToken);

  const isLoggedIn = !!token;

  const loginHandler = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.setItem('token', '');
    setToken('');
  };

  const parseJwt = (token: string): User | undefined => {
    const base64Url = token.split('.')[1];
    if (base64Url) {
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const parsed = JSON.parse(jsonPayload);
      return {
        id: parsed.nameid,
        email: parsed.unique_name,
        role: parsed.role,
      };
    }
    return;
  };

  const user = parseJwt(token);

  const getUserIdHandler = () => {
    return user?.id || '';
  };

  const isRestaurantOwner = user?.role === 'RestaurantOwner';

  const contextValue = {
    token,
    user,
    isLoggedIn,
    isRestaurantOwner,
    getUserId: getUserIdHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
