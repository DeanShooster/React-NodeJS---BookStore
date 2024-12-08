import { createContext, useCallback, useEffect, useState } from "react";
import { GetBooks } from "../API/Home";

export interface IBook {
  name: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  coverUrl: string;
  price: number;
}

interface IBookContext {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
}

export const BookContext = createContext<IBookContext>({
  books: [],
  setBooks: () => {},
});

export const BookContextProvider = (props: any) => {
  const [books, setBooks] = useState<IBook[]>([]);

  const initBooks = useCallback(async () => {
    const result = await GetBooks();
    if (result) setBooks(result);
  }, []);

  useEffect(() => {
    initBooks();
  }, [initBooks]);

  return <BookContext.Provider value={{ books, setBooks }}>{props.children}</BookContext.Provider>;
};
