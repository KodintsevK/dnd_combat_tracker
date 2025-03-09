import React, { useContext, useState } from 'react';
import {UserContext} from '../../context/userContext.ts';

const Auth : React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user, setUserContext }  = useContext(UserContext);


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUserContext(data); // Устанавливаем пользователя в контекст
        alert('Вы вошли!');
      } else {
        alert(data.message || 'Ошибка при входе');
        
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUserContext(data); // Устанавливаем пользователя в контекст
        alert('Вы зарегистрированы!');
      } else {
        alert(data.message || 'Ошибка при регистрации');
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };
  
  return (
    <div>
      <h2>Логин / Регистрация</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
    );
};

export default Auth;