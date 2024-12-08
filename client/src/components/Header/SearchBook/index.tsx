import "./index.scss";
import { SearchIcon } from "../../../assets";
import { useContext, useState } from "react";
import { BookContext, IBook } from "../../../Context/BookContext";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { BookModal } from "../../BookModal";

export const SearchBook = () => {
  const { books } = useContext(BookContext);
  const { dictionary } = useContext(DictionaryContext);
  const [bookSearchValue, setBookSearchValue] = useState<string>("");
  const [openBookModal, setOpenBookModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const MAX_BOOK_VIEW = 5;

  const searchBookHandler = (e: any) => {
    setBookSearchValue(e.target.value);
  };

  const filteredBooks = books.filter((book: IBook) => book.name.toLowerCase().includes(bookSearchValue.toLowerCase())).slice(0, MAX_BOOK_VIEW);

  const selectBookHandler = (book: IBook) => {
    setSelectedBook(book);
    setOpenBookModal(true);
  };

  return (
    <div className="search-book-container">
      <div className="search-book-wrapper">
        <input placeholder="Search Book" onChange={searchBookHandler} />
        <img alt="" src={SearchIcon} />
      </div>
      {bookSearchValue.length > 0 && (
        <div className="search-book-results-wrapper">
          <ul>
            {filteredBooks.length === 0 ? (
              <div className="no-search-results">{dictionary.Header.noResults}</div>
            ) : (
              filteredBooks.map((book, index: number) => {
                return (
                  <li key={index} onClick={() => selectBookHandler(book)}>
                    <img alt="" src={book.coverUrl} />
                    <div>
                      <h3>{book.name}</h3>
                      <span>{book.author}</span>
                      <span>{`${book.year} | ${book.genre}`}</span>
                    </div>
                    <span>{book.price}$</span>
                  </li>
                );
              })
            )}
          </ul>
          {filteredBooks.length === MAX_BOOK_VIEW && <button>{dictionary.Header.viewAllResults}</button>}
        </div>
      )}
      {openBookModal && selectedBook && <BookModal book={selectedBook} closeBookModal={() => setOpenBookModal(false)} />}
    </div>
  );
};
