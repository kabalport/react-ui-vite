import React, { ChangeEvent, useState } from "react";
import HomePageText from "@/assets/HomePageText.png";
import { useSignup } from "@/hooks/useSignup";
import HText from "@/share/HText";
import useMediaQuery from "@/hooks/useMediaQuery";

const SignupForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPwd, setEnteredPwd] = useState("");
  const [displayName, setDisplayName] = useState("");
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { error, isPending, signup } = useSignup();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      setEnteredEmail(e.target.value);
    } else if (e.target.type === "password") {
      setEnteredPwd(e.target.value);
    } else if (e.target.type === "text") {
      setDisplayName(e.target.value);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(enteredEmail, enteredPwd, displayName);
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
          <HText>SIGN UP</HText>
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
          <div className="mb-4">
            <label
              className="text-grey-500 mb-2 ml-9 block text-left font-bold"
              htmlFor="myDisplayName"
            >
              Your Name
            </label>
            <input
              className="w-5/6 rounded-md bg-primary-100 p-1 text-left focus:bg-white"
              type="text"
              name="myDisplayName"
              required
              value={displayName}
              onChange={onChange}
            />
          </div>
          <div>
            {error && (
              <strong className="text-red-600">
                이미 존재하는 아이디입니다.
              </strong>
            )}
          </div>
          {!isPending && (
            <button
              type="submit"
              className="mt-5 cursor-pointer rounded-md bg-primary-300 p-3 px-10 text-white hover:bg-secondary-500"
            >
              Sign up
            </button>
          )}

          {isPending && <strong>Loading...</strong>}
        </form>
      </section>
    </div>
  );
};

export default SignupForm;
