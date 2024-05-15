"use client";
import React from "react";
import Image from "next/image";
import { useLogout } from "../hooks/useLogout";

function LogoutButton() {
  const { logout } = useLogout();

  //logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative flex justify-end mr-14 mt-8">
      <button className="flex items-center gap-3" onClick={handleLogout}>
        <Image
          src="/Logout-Button.png"
          width={500}
          height={500}
          alt=""
          className="w-10 h-10"></Image>
        <span className="text-white text-xl underline">logout</span>
      </button>
    </div>
  );
}

export default LogoutButton;
