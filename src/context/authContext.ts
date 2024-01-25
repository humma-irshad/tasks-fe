import { Dispatch, SetStateAction, createContext } from "react";

interface IAuthContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const authContext = createContext<IAuthContext | undefined>(undefined);

export default authContext;
