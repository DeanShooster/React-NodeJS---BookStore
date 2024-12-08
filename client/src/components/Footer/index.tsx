import { useContext } from "react";
import { DictionaryContext } from "../../Context/DictionaryContext";

import "./index.scss";
import { CopyRight } from "../../assets";
import { routes } from "../../router";

export const Footer = () => {
  const { dictionary } = useContext(DictionaryContext);

  const nav = [dictionary.Footer.serviceTerms, dictionary.Footer.privacy, dictionary.Footer.contact, dictionary.Footer.app];

  return (
    <footer>
      <nav>
        {nav.map((navItem: string, index: number) => {
          return (
            <a key={index} href={routes.Footer.path}>
              {navItem}
            </a>
          );
        })}
      </nav>
      <div>
        <img alt="" src={CopyRight} />
        <span>{dictionary.Footer.rights}</span>
      </div>
    </footer>
  );
};
