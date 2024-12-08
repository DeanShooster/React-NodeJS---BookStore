import { useState } from "react";
import { IBook } from "../../../../Context/BookContext";

import "./index.scss";

import { BookModal } from "../../../../components/BookModal";

interface ITrend {
  book: IBook;
  rank: number;
}

export const Trend = ({ book, rank }: ITrend) => {
  const [openBookModal, setOpenBookModal] = useState<boolean>(false);

  return (
    <>
      <div className="trend-wrapper" onClick={() => setOpenBookModal(true)}>
        <div className="trend-information">
          <span>{book.name}</span>
          <span>0{rank}</span>
        </div>
        <div className="trend-image">
          <img alt="" src={book.coverUrl} />
        </div>
      </div>
      {openBookModal && <BookModal book={book} closeBookModal={() => setOpenBookModal(false)} />}
    </>
  );
};
