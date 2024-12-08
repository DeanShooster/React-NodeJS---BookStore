import { useContext, useState } from "react";
import { DictionaryContext } from "../../Context/DictionaryContext";
import { UserContext } from "../../Context/UserContext";
import { IBook } from "../../Context/BookContext";
import { AddBookToCart } from "../../API/Cart";

import { USER_TOKEN } from "../../config";

import "./index.scss";
import { Wall } from "../Wall";

interface IBookModal {
  book: IBook;
  closeBookModal: Function;
}

export const BookModal = ({ book, closeBookModal }: IBookModal) => {
  const { dictionary } = useContext(DictionaryContext);
  const { user, setUser } = useContext(UserContext);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const addBookToCartHandler = async () => {
    const token = localStorage.getItem(USER_TOKEN);
    if (token && user) {
      const result = await AddBookToCart(book.name, token);
      if (result.error) setErrorMsg(result.error);
      else {
        setErrorMsg("");
        setUser({ ...user, cart: [...user.cart, book] });
        closeBookModal();
      }
    }
  };

  return (
    <>
      <Wall />
      <div className="selected-book-modal">
        <img alt="" src={book.coverUrl} />
        <div>
          <span>{book.price}$</span>
          <h2>{book.name}</h2>
          <h3>
            {book.author} | {book.year} | {book.genre}
          </h3>
          <p>{book.description}</p>
          <div>
            {user && <button onClick={addBookToCartHandler}>{dictionary.General.addToCart}</button>}
            <button onClick={() => closeBookModal()}>{dictionary.General.back}</button>
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}
        </div>
      </div>
    </>
  );
};
