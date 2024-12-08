import { useContext } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { BookContext } from "../../../Context/BookContext";

import "./index.scss";

import { BookItem } from "./BookItem";

export const BookStore = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { books } = useContext(BookContext);

  return (
    <section className="book-store-container">
      <h2>{dictionary.Home.store}</h2>
      <div>
        {books.map((book, index: number) => {
          return <BookItem key={index} book={book} />;
        })}
      </div>
    </section>
  );
};
