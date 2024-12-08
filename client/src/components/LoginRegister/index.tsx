import { useContext, useState } from "react";
import { DictionaryContext } from "../../Context/DictionaryContext";
import { UserContext } from "../../Context/UserContext";
import { USER_TOKEN } from "../../config";
import { Login, Register } from "../../API/User";

import "./index.scss";

import { Wall } from "../Wall";

interface ILoginRegister {
  closeLoginRegister: Function;
}

export const LoginRegister = ({ closeLoginRegister }: ILoginRegister) => {
  const { dictionary } = useContext(DictionaryContext);
  const { setUser } = useContext(UserContext);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { welcomeBack, email, name, password, forgotPassword, login, register, noAccount, yesAccount, registerHere, returnLogin } = dictionary.Header;

  const forgotPasswordHandler = (event: any) => {
    event.preventDefault();
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: { [key: string]: string } = {};
    new FormData(event.currentTarget).forEach((value: FormDataEntryValue, key: string) => (formData[key] = value as string));

    const { email, name, password } = formData;

    if (isLogin) {
      if (email && password) {
        const result = await Login({ email, password });
        if (result.Error) setError(dictionary.Error.invalidCredentials);
        else {
          localStorage.setItem(USER_TOKEN, result.token);
          setUser(result.user);
          closeLoginRegister();
        }
      } else setError(dictionary.Error.missingData);
    } else {
      if (email && name && password) {
        const result = await Register({ email, name, password });
        if (result.user) {
          localStorage.setItem(USER_TOKEN, result.token);
          setUser(result.user);
          closeLoginRegister();
        } else setError(dictionary.Error.userExist);
      } else setError(dictionary.Error.missingData);
    }
  };

  return (
    <>
      <Wall />
      <div className="login-register-wrapper">
        <div className="close-login-register-wrapper" onClick={() => closeLoginRegister()}>
          <span>X</span>
        </div>
        <h2>{welcomeBack}</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label>{email}</label>
            <input placeholder="name@email.com" type="email" name="email" />
          </div>
          {!isLogin && (
            <div>
              <label>{name}</label>
              <input placeholder={name} type="text" name="name" />
            </div>
          )}
          <div>
            <label>{password}</label>
            <input placeholder={password} type="password" name="password" />
          </div>
          <a href="/" onClick={forgotPasswordHandler}>
            {forgotPassword}
          </a>
          <button>{isLogin ? login : register}</button>
          {error && <span className="error">{error}</span>}
        </form>
        <div className="login-register-texts">
          <span>{isLogin ? noAccount : yesAccount}</span>
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? registerHere : returnLogin}
          </span>
        </div>
      </div>
    </>
  );
};
