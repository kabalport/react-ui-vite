import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

type UserInfo = {
  (email: string, password: string): void;
};

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch }: any = useAuthContext();

  const login: UserInfo = (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        // Loged in
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "login", payload: user });
        setError(null);
        setIsPending(false);

        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };

  return { error, isPending, login };
};
