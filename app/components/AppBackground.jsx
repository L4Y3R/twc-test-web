import React from "react";
import Image from "next/image";

function AppBackground() {
  return (
    <div className="fixed left-0 bottom-0 w-screen h-screen -z-10">
      <div className="absolute top-0 right-0 w-72 h-72">
        <Image src="/background.png" width={500} height={500} alt=""></Image>
      </div>
      <div className="absolute bottom-0 left-0 w-72 h-72">
        <Image src="/backgroundb.png" width={500} height={500} alt=""></Image>
      </div>
      <div className="relative">
        <Image
          src="/Ellipse 1.png"
          width={1000}
          height={1000}
          alt=""
          className="w-screen h-screen"></Image>
      </div>
    </div>
  );
}

export default AppBackground;
