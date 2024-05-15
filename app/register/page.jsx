"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import LoginRegisterBackground from "../components/LoginRegisterBackground";
import BigLogo from "../components/BigLogo";
import { useRegister } from "../hooks/useRegister";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../hooks/useAuthContext";

function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, error, isLoading } = useRegister();
  const { user } = useAuthContext();

  //redirect to login
  useEffect(() => {
    if (user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password, confirmPassword);
  };

  return (
    <>
      <LoginRegisterBackground />
      <div className="flex justify-between md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-72 h-screen items-center max-w-[1550px]">
        <div className="flex flex-col relative z-10">
          <h1 className="font-semibold text-5xl h1 mb-8">Register now!</h1>

          {/* Email and password and confirmation */}
          <form>
            <input
              type="email"
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input mb-4 w-[80%]"
            />

            <input
              type="password"
              placeholder="create password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input mb-4 w-[80%]"
            />

            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="input mb-4 w-[80%]"
            />

            {error && (
              <div>
                <span className=" text-red-400 mr-8 mt-5 font-custom text-xl leading-normal tracking-wide font-semibold">
                  {error}
                </span>
              </div>
            )}

            {/* register button */}
            <button
              className="mt-16 w-36 button"
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
                <span>register</span>
              )}
            </button>
          </form>

          {/* Go back to login */}
          <Link href="/login" className="mt-24">
            <span className="text-white font-custom text-lg underline">
              {"<"} Back to login
            </span>
          </Link>
        </div>

        {/* Logo section */}
        <BigLogo />
      </div>
    </>
  );
}

export default page;
