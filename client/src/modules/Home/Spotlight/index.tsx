import { useCallback, useContext, useEffect, useState } from "react";
import { GetSpotlight } from "../../../API/Home";

import "./index.scss";
import { Cart, FakeSpotLight } from "../../../assets";
import { DictionaryContext } from "../../../Context/DictionaryContext";

interface ISpotlight {
  name: string;
  category: string;
  year: number;
  desc: string;
}

export const Spotlight = () => {
  const { dictionary } = useContext(DictionaryContext);
  const [spotlights, setSpotlights] = useState<ISpotlight[]>([]);

  const initSpotlight = useCallback(async () => {
    const result = await GetSpotlight();
    if (result) setSpotlights(result);
  }, []);

  useEffect(() => {
    initSpotlight();
  }, [initSpotlight]);

  if (spotlights.length === 0) return null;

  return (
    <section className="spotlight-container">
      <img alt="" src={FakeSpotLight} />
      <div className="spotlight-wrapper">
        <span>#1 {dictionary.Home.spotlight}</span>
        <h2>{spotlights[0].name}</h2>
        <div>
          <p>{spotlights[0].category}</p> | <p>{spotlights[0].year}</p>
        </div>
        <p>{spotlights[0].desc}</p>
        <button>
          <img alt="" src={Cart} />
          <span>{dictionary.General.buyNow}</span>
        </button>
      </div>
    </section>
  );
};
