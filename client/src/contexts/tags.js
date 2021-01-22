import { createContext, useState } from "react";
export const TagConetext = createContext();
export const TagContextProvider = (props) => {
  const [tags, setTags] = useState([]);
  return (
    <TagConetext.Provider
      value={{ tags: [tags, setTags] }}
    >
      {props.children}
    </TagConetext.Provider>
  );
};
