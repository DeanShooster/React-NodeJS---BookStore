import { useContext, useState } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { UserContext } from "../../../Context/UserContext";

import "./index.scss";

import { LoginRegister } from "../../LoginRegister";
import { HeaderProfile } from "./HeaderProfile";

export const User = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { user } = useContext(UserContext);

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="user-wrapper">{user ? <HeaderProfile /> : <button onClick={() => setOpenModal(true)}>{dictionary.Header.login}</button>}</div>
      {openModal && <LoginRegister closeLoginRegister={() => setOpenModal(false)} />}
    </>
  );
};
