import React from "react";
import Link from "next/link";
import AppBackground from "../components/AppBackground";
import SmallLogo from "../components/SmallLogo";
import Contacts from "../components/Contacts";
import LogoutButton from "../components/LogoutButton";

function page() {
  return (
    <>
      <AppBackground />
      <div className="relative z-10 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-72 max-w-[1550px] my-20">
        <SmallLogo />

        <div className="flex justify-between items-center">
          <h1 className="h1 text-5xl font-semibold"> Contacts </h1>
          <Link href="/contacts/new">
            <button className="button w-72 py-2 h-12"> add new contact </button>
          </Link>
        </div>

        <Contacts />
      </div>

      {/* Logout */}
      <LogoutButton />
    </>
  );
}

export default page;
