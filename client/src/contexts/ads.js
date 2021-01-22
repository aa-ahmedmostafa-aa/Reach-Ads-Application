import { createContext, useState } from "react";
export const AdsConetext = createContext();
export const AdsContextProvider = (props) => {
  const [ads, setAds] = useState([]);
  return (
    <AdsConetext.Provider value={{ ads: [ads, setAds] }} >
      {props.children}
    </AdsConetext.Provider>
  );
};