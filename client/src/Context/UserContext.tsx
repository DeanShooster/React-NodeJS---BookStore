import { createContext, useCallback, useEffect, useState } from "react";
import { Auth } from "../API/User";

import { USER_TOKEN } from "../config";

interface IBook {
  name: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  coverUrl: string;
  price: number;
}

interface IUser {
  email: string;
  name: string;
  cart: IBook[];
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<IUser | null>(null);

  const initUser = useCallback(async () => {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      const result = await Auth(token);
      if (result.user) setUser(result.user);
      else localStorage.removeItem(USER_TOKEN);
    } else setUser(null);
  }, []);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
