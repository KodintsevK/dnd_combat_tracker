import React, { FC, useState, ReactNode, useEffect } from 'react';

import {UserContext} from '../context/userContext.ts';
import User from '../Interface/user.tsx';


const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Загрузка пользователя из localStorage при инициализации
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);


  const setUserContext = (user: User | null) => {
    setUser(user);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export default AppProvider;