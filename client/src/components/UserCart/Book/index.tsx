import { useContext, useState } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { UserContext } from "../../../Context/UserContext";
import { IBook } from "../../../Context/BookContext";

import { USER_TOKEN } from "../../../config";

import "./index.scss";

interface ICartBook {
  book: IBook;
}

export const Book = ({ book }: ICartBook) => {
  const { dictionary } = useContext(DictionaryContext);
  const { user } = useContext(UserContext);
  const [isHover, setIsHover] = useState<boolean>(false);

  const removeBookHandler = async () => {
    const token = localStorage.getItem(USER_TOKEN);
    if (token && user) {
    }
  };

  return (
    <div className="book-wrapper" onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <img alt="" src={book.coverUrl} />
      {isHover && <button onClick={removeBookHandler}>{dictionary.Cart.remove}</button>}
    </div>
  );
};
