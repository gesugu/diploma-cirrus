import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import classes from "./RegistrationPage.module.css"

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setIsAuth} = useContext(AuthContext)

  const getRegister = () => {
    if (username && password) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("username", username);
      setIsAuth(true);
      navigate("/");
    }
  }

  return (
    <div className={classes.registerPage}>
      <h2 className={classes.registerPageH2}>Регистрация</h2>
      <div className={classes.registerPageInputP}>
        <input
          type="text"
          placeholder="Введите имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.registerPageInput}
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.registerPageInput}
        />
      </div>
      <button className={classes.registerPageBtn} onClick={getRegister}>
        Войти
      </button>
    </div>
  );
};

export default RegistrationPage