import { createContext, useState } from "react";
export const UserConetext = createContext();
export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  return (
    <UserConetext.Provider
      value={{ user: [user, setUser] }}
    >
      {props.children}
    </UserConetext.Provider>
  );
};
