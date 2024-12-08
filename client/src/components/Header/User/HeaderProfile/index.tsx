import { useContext, useState } from "react";
import { UserContext } from "../../../../Context/UserContext";

import "./index.scss";
import { UserCartIcon, UserProfileIcon } from "../../../../assets";
import { UserCart } from "../../../UserCart";

export const HeaderProfile = () => {
  const { user } = useContext(UserContext);
  const [openCart, setOpenCart] = useState<boolean>(false);

  return (
    <>
      <div className="header-user-profile-wrapper">
        <div className="user-cart" onClick={() => setOpenCart(true)}>
          <img alt="" src={UserCartIcon} />
          {user && user.cart.length > 0 && <div>{user.cart.length}</div>}
        </div>
        <img alt="" src={UserProfileIcon} />
      </div>
      {openCart && <UserCart closeUserCart={() => setOpenCart(false)} />}
    </>
  );
};
