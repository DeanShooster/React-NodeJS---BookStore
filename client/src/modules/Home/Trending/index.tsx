import { useContext } from "react";
import { BookContext } from "../../../Context/BookContext";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import "./index.scss";

import { Trend } from "./Trend";

export const Trending = () => {
  const { books } = useContext(BookContext);
  const { dictionary } = useContext(DictionaryContext);

  return (
    <section className="trending-container">
      <h2>{dictionary.Home.trending}</h2>
      <div>
        {books.map((book, index: number) => {
          if (index >= 6) return null;
          return <Trend key={index} book={book} rank={index + 1} />;
        })}
      </div>
    </section>
  );
};
