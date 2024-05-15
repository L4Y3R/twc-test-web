import React from "react";
import Image from "next/image";

function LoginRegisterBackground() {
  return (
    <div className="fixed w-screen h-screen overflow-hidden flex items-center -z-10">
      <Image
        src="/Login-Background.png"
        width={880}
        height={880}
        alt=""
        className="absolute right-0 "
      />
      <Image
        src="/Ellipse 2.png"
        width={1000}
        height={1000}
        alt=""
        className="absolute md:left-[-35%] lg:left-[-25%] xl:left-[-20%]"
      />
    </div>
  );
}

export default LoginRegisterBackground;
