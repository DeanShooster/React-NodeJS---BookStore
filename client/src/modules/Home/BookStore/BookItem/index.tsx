import { useContext, useState } from "react";
import { IBook } from "../../../../Context/BookContext";
import { DictionaryContext } from "../../../../Context/DictionaryContext";

import "./index.scss";
import { Cart } from "../../../../assets";

import { BookModal } from "../../../../components/BookModal";

interface IBookItem {
  book: IBook;
}

export const BookItem = ({ book }: IBookItem) => {
  const { dictionary } = useContext(DictionaryContext);
  const [openBookModal, setOpenBookModal] = useState<boolean>(false);

  return (
    <>
      <div className="book-item-wrapper">
        <div className="book-item-information">
          <span>{book.name}</span>
          <span>{book.price}$</span>
        </div>
        <div className="book-item-image-wrapper">
          <img alt="" src={book.coverUrl} />
          <button onClick={() => setOpenBookModal(true)}>
            <img alt="" src={Cart} />
            <span>{dictionary.General.buyNow}</span>
          </button>
        </div>
      </div>
      {openBookModal && <BookModal book={book} closeBookModal={() => setOpenBookModal(false)} />}
    </>
  );
};
