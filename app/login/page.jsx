"use client";

import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../hooks/useAuthContext";

import Link from "next/link";
import Image from "next/image";
import LoginRegisterBackground from "../components/LoginRegisterBackground";
import BigLogo from "../components/BigLogo";

function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext();

  //redirect to homepage
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <>
      <LoginRegisterBackground />
      <div className="flex justify-between md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-72 h-screen items-center max-w-[1550px]">
        <div className="flex flex-col relative z-10">
          <h1 className="font-semibold text-5xl h1">Hi there,</h1>
          <p className="text-white font-custom text-3xl leading-tight tracking-wide mt-1">
            Welcome to our <br />
            contacts portal
          </p>

          {/* Email and password */}
          <input
            type="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input"
          />

          {error && (
            <span className=" text-red-400 mr-8 mt-5 font-custom text-xl leading-normal tracking-wide font-semibold">
              {error}
            </span>
          )}

          <div className="flex flex-row items-center mt-20 gap-6">
            <button
              className="button w-36"
              onClick={handleSubmit}
              disabled={isLoading}>
              {/*show a loading icon when loading*/}
              {isLoading ? (
                <Image
                  src="/loading-white.svg"
                  alt="loading"
                  width={30}
                  height={30}></Image>
              ) : (
                <span>login</span>
              )}
            </button>
            <p className="text-white font-custom text-xl tracking-wide">or</p>

            {/* Redirect to register */}
            <Link href="/register">
              <span className="text-white font-custom text-lg mt-4 underline">
                Click here to register
              </span>
            </Link>
          </div>
        </div>

        {/* Logo section */}
        <BigLogo />
      </div>
    </>
  );
}

export default page;
