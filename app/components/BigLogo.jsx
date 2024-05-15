import React from "react";
import Image from "next/image";

function BigLogo() {
  return (
    <div className="px-24 relative z-10 left-[15%]">
      <Image src="/Logo-Black.png" width={130} height={130} alt="logo"></Image>
      <p className="text-portalGreen font-custom font-bold text-6xl">
        contacts
      </p>

      <p className="text-portalGreen font-custom text-6xl">portal</p>
    </div>
  );
}

export default BigLogo;
