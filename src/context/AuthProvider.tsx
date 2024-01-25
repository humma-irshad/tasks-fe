import { ReactNode, useEffect, useState } from "react";

import authContext from "./authContext";

interface IProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: IProps) {
  const [token, setToken] = useState(sessionStorage.getItem("accessToken" || ""));
  
  // Update context and localStorage when token changes
  useEffect(() => {
    if (token) sessionStorage.setItem("accessToken", token);
  }, [token]);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
