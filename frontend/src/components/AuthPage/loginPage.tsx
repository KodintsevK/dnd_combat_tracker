import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../context/userContext.ts';
import "./loginPage.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Auth : React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user, setUserContext }  = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // переключение видимости пароля
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const IP = "89.111.170.26"

  // таймер на пропадение видимости ошибки
  useEffect(() => {
    if (error) {
        const timer = setTimeout(() => {
            setError(null); 
        }, 6000);

        return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async () => {
    try {

      const response = await fetch(`http://localhost:5000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        setUserContext(data);                                     // Устанавливаем пользователя в контекст

        localStorage.setItem('user', JSON.stringify(data));     // Устанавливаем пользователя в сессию

        navigate('/');
      } else {
        setError(data.message || 'Ошибка при входе');
      }


    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`http://localhost:5000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setUserContext(data); 

        localStorage.setItem('user', JSON.stringify(data));

        navigate('/');
      } else {
        setError(data.message || 'Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };
  
  return (
    <div className='login-page'>
      <div className='login-card'>
        <div className="input-block">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={5}
              maxLength={16}
              required
            />
            <span 
              onClick={togglePasswordVisibility} 
              id="togglePassword"
              className="eye-icon"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
            
          </div>
        </div>

        <div className="button-block">
          <button onClick={handleLogin}>Войти</button>
          <button onClick={handleRegister}>Зарегистрироваться</button>
        </div>

        {error && (
            <div className="error-block">
                <p>{error}</p>
            </div>
        )}
      </div>
    </div>
    );
};

export default Auth;