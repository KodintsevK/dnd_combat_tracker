import React, { FC, useState, ReactNode } from 'react';

import {UserContext} from '../context/userContext.ts';
import User from '../Interface/user.tsx';


const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const setUserContext = (user: User | null) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export default AppProvider;