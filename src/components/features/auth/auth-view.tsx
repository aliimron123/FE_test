"use client";

import React from "react";
import Image from "next/image";
import FormLogin from "./form-login";

function AuthView() {
  return (
    <div className="flex h-screen w-full">
      {/* Left side form */}
      <div className="flex w-1/2 items-center justify-center pb-10">
        <FormLogin />
      </div>

      {/* Right side image fills full height & width */}
      <div className="relative h-full w-1/2">
        <Image
          src="/bg-rightside.svg"
          alt="bg-jasamarga"
          fill // <— fills entire parent container
          className="object-cover" // cover keeps aspect ratio, fills container
          priority
        />
      </div>
    </div>
  );
}

export default AuthView;
