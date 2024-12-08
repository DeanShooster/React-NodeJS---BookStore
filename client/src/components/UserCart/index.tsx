import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { DictionaryContext } from "../../Context/DictionaryContext";

import "./index.scss";
import { Wall } from "../Wall";

import { Book } from "./Book";

interface IUserCart {
  closeUserCart: Function;
}

export const UserCart = ({ closeUserCart }: IUserCart) => {
  const { dictionary } = useContext(DictionaryContext);
  const { user } = useContext(UserContext);

  if (!user) return null;

  const totalPrice = user.cart.reduce((total, book) => {
    return total + book.price;
  }, 0);

  return (
    <>
      <Wall />
      <div className="user-cart-container">
        <div className="close-modal" onClick={() => closeUserCart()}>
          X
        </div>
        <h2>
          {user.name}'s {dictionary.Cart.cart}
        </h2>
        <div>
          {user.cart.map((book, index: number) => {
            return <Book key={index} book={book} />;
          })}
        </div>
        <button>
          {dictionary.Cart.checkout} {totalPrice}$
        </button>
      </div>
    </>
  );
};
