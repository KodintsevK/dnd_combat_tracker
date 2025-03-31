import Home from "./components/HomePage/Home.tsx";
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Auth from './components/AuthPage/loginPage.tsx';
import { UserContext } from "./context/userContext.ts";
import UnitsPage from "./components/UnitsPage/unitsPage.tsx";

const App = () => {

  const { user, setUserContext }  = useContext(UserContext);

  const handleLogout = () => {
    setUserContext(null); // Сбрасываем пользователя в null
  };

  const ProtectedAuthRoute: React.FC = () => {
    const { user } = useContext(UserContext); // Получаем пользователя из контекста

    // Если пользователь авторизирован, перенаправляем на главную страницу
    if (user) {
        return <Navigate to="/" replace />;
    }

    // Если пользователь не авторизирован, показываем компонент Auth
    return <Auth />;
  };

  const ProtectedUnitsRoute: React.FC = () => {
    const { user } = useContext(UserContext); // Получаем пользователя из контекста

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <UnitsPage />;
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
              {user && (
                  <>
                    <li>
                        <Link to="/units">Юниты</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Выйти</Link>
                    </li>
                  </>
              )}
              {!user && (
                  <li>
                      <Link to="/auth">Логин/Регистрация</Link>
                  </li>
              )}
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/units" element={<ProtectedUnitsRoute />} />


            <Route path="/auth" element={<ProtectedAuthRoute />} />
          </Routes>
        </div>
      </Router>
    )
};

export default App;