import React, { ChangeEvent, useState } from "react";
import HomePageText from "@/assets/HomePageText.png";
import HText from "@/share/HText";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPwd, setEnteredPwd] = useState("");
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate = useNavigate();
  const { error, isPending, login } = useLogin();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      setEnteredEmail(e.target.value);
    } else if (e.target.type === "password") {
      setEnteredPwd(e.target.value);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(enteredEmail, enteredPwd);
  };

  return (
    <div className="bg-pra flex h-full items-center justify-center bg-primary-300">
      {isAboveMediumScreens && (
        <div className="relative">
          <div className="before:absolute before:-top-10 before:-left-20 before:z-[-1] md:before:content-evolvetext">
            <img alt="home-page-text" src={HomePageText} />
          </div>
        </div>
      )}
      <section
        className="w-5/6 max-w-md rounded-md bg-gray-20 p-4 text-center shadow" //
        onSubmit={submitHandler}
      >
        <form>
          <HText>LOGIN</HText>
          <hr className="mt-3" />
          <div className="mb-4">
            <label
              className="text-grey-500 mt-5 mb-2 ml-9 block text-left font-bold"
              htmlFor="myEmail"
            >
              Your Email
            </label>
            <input
              className="w-5/6 rounded-md bg-primary-100 p-1 text-left focus:bg-white"
              type="email"
              name="myEmail"
              required
              placeholder="example@email.com"
              value={enteredEmail}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="text-grey-500 mb-2 ml-9 block text-left font-bold"
              htmlFor="password"
            >
              Your Password
            </label>
            <input
              className="w-5/6 rounded-md bg-primary-100 p-1 text-left focus:bg-white"
              type="password"
              name="password"
              required
              placeholder="6~16"
              maxLength={16}
              minLength={6}
              value={enteredPwd}
              onChange={onChange}
            />
          </div>
          <div>
            {error && (
              <strong className="text-red-600">잘못된 아이디입니다.</strong>
            )}
          </div>
          {!isPending && (
            <button
              type="submit"
              className="mt-5 cursor-pointer rounded-md bg-primary-300 p-3 px-10 text-white hover:bg-secondary-500"
            >
              Login
            </button>
          )}
          {isPending && <strong>Loading...</strong>}
        </form>
      </section>
    </div>
  );
};

export default LoginForm;
