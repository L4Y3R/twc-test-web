import React from "react";
import AppBackground from "../../components/AppBackground";
import SmallLogo from "../../components/SmallLogo";
import LogoutButton from "../../components/LogoutButton";
import InputForm from "../../components/InputForm";

function page() {
  return (
    <>
      <div className="md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-72 max-w-[1550px]">
        <AppBackground />
        <div className="relative z-10 mt-16">
          <SmallLogo />
          <InputForm />
        </div>
      </div>
      <LogoutButton />
    </>
  );
}

export default page;
