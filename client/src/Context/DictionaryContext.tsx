import { createContext, useCallback, useEffect, useState } from "react";
import { EnglishDictionary } from "../Dictionary";

const defaultDictionary: IDictionary = {
  General: {},
  Header: {},
  Cart: {},
  Home: {},
  Footer: {},
  Error: {},
};

export interface IDictionary {
  General: { [key: string]: string };
  Header: { [key: string]: string };
  Cart: { [key: string]: string };
  Home: { [key: string]: string };
  Footer: { [key: string]: string };
  Error: { [key: string]: string };
}

interface IDictionaryContext {
  dictionary: IDictionary;
}

export const DictionaryContext = createContext<IDictionaryContext>({
  dictionary: {
    ...defaultDictionary,
  },
});

export const DictionaryContextProvider = (props: any) => {
  const [dictionary, setDictionary] = useState<IDictionary>({
    ...defaultDictionary,
  });

  const initDictionary = useCallback(() => {
    setDictionary(EnglishDictionary);
  }, []);

  useEffect(() => {
    initDictionary();
  }, [initDictionary]);

  return <DictionaryContext.Provider value={{ dictionary }}>{props.children}</DictionaryContext.Provider>;
};
