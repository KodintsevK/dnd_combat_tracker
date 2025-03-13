import Home from "./components/HomePage/Home.tsx";
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Auth from './components/AuthPage/loginPage.tsx';
import { UserContext } from "./context/userContext.ts";

const App = () => {

  const { user, setUserContext }  = useContext(UserContext);


  const ProtectedAuthRoute: React.FC = () => {
    const { user } = useContext(UserContext); // Получаем пользователя из контекста

    // Если пользователь авторизирован, перенаправляем на главную страницу
    if (user) {
        return <Navigate to="/" replace />;
    }

    // Если пользователь не авторизирован, показываем компонент Auth
    return <Auth />;
  };


  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                Добро пожаловать {user ? user.email : 'Гость'}!
              </li>
              <li>
                <Link to="/">Главная</Link>
              </li>
              {!user && (
                  <li>
                      <Link to="/auth">Логин/Регистрация</Link>
                  </li>
              )}
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<ProtectedAuthRoute />} />
          </Routes>
        </div>
      </Router>
    )
};

export default App;