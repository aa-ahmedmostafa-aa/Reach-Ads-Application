import { createContext, useState } from "react";
export const CategoryConetext = createContext();
export const CategoryContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  return (
    <CategoryConetext.Provider
      value={{ categories: [categories, setCategories] }}
    >
      {props.children}
    </CategoryConetext.Provider>
  );
};
