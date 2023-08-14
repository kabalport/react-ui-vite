import { useReducer, createContext, useEffect, Dispatch } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { User } from "firebase/auth";

export type Auth = {
  user: User | null;
  isAuthReady: boolean;
  dispatch?: Dispatch<Action>;
};

export const AuthContext = createContext<Auth | undefined>(undefined);

type Action =
  | { type: "login"; payload: User | null }
  | { type: "logout" }
  | { type: "isAuthReady"; payload: User | null };

const authReducer = (state: Auth, action: Action): Auth => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      dispatch({ type: "isAuthReady", payload: user });
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
