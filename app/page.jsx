"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./hooks/useAuthContext";

import AppBackground from "./components/AppBackground";
import SmallLogo from "./components/SmallLogo";
import LogoutButton from "./components/LogoutButton";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  //fetch contacts to see if there are contacts in database
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch("http://localhost:4000/api/contacts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setContacts(json);
      }
    };

    if (user) {
      fetchContacts();
    }

    //if not logged in, redirect to login page
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    // if there are contacts redirect to contacts page
    if (contacts && contacts.length > 0) {
      router.push("/contacts");
    }

    setIsLoading(false);
  }, [user, router, contacts]);

  return (
    <main className="mb-5">
      {/*show a loading screen*/}
      {isLoading ? (
        <div className="h-screen w-screen bg-white flex justify-center items-center">
          <Image
            src="/loading.svg"
            alt="loading"
            width={100}
            height={100}></Image>
        </div>
      ) : (
        <>
          <AppBackground />
          <div className="relative z-10 my-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-72 max-w-[1550px]">
            {/* Logo Section */}
            <SmallLogo />
            <div className="flex flex-col">
              <h1 className="text-white font-custom font-semibold text-5xl leading-normal tracking-wid">
                {" "}
                Welcome,{" "}
              </h1>
              <p className="text-white font-custom text-3xl leading-normal tracking-wide mt-1">
                {" "}
                This is where your contacts will live. Click the button below to
                add a new contact.
              </p>

              <Link href="/contacts/new">
                <button className="button w-80 my-16">
                  {" "}
                  add your first contact{" "}
                </button>
              </Link>
            </div>
          </div>

          {/* Logout */}

          <LogoutButton />
        </>
      )}
    </main>
  );
}
