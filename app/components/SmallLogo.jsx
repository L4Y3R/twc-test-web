import React from "react";
import Image from "next/image";

function SmallLogo() {
  return (
    <div className="h-44">
      <Image
        src="/Logo-White.png"
        width={400}
        height={400}
        alt=""
        className="w-20 h-7"></Image>
      <p className="text-white font-custom font-semibold text-2xl">contacts</p>

      <p className="text-white font-custom text-2xl">portal</p>
    </div>
  );
}

export default SmallLogo;
