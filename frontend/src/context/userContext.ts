import { createContext } from 'react';
import User from '../Interface/user';

// Интерфейс для контекста
type UserContextType = {
  user: User | null;
  setUserContext: (user: User | null) => void;
}

// Создаем контекст с типом UserContextType
const UserContext = createContext<UserContextType>({
  user: null,
  setUserContext: () => {},
});

export { UserContext, UserContextType };
