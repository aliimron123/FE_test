"use client";

import React from "react";
import PaymentChart from "./payment-chart";
import ShiftCart from "./shift-cart";

function DashView() {
  return (
    <section className="flex h-full w-full flex-col gap-3">
      <div className="w-full rounded-md bg-white p-4"> Hello</div>
      <div className="flex h-full w-full flex-1 gap-2">
        <div className="w-full">
          <PaymentChart />
        </div>
        <ShiftCart />
      </div>{" "}
      <div className="flex h-full w-full flex-1 gap-2">
        <div className="w-full">
          <PaymentChart />
        </div>
        <ShiftCart />
      </div>
    </section>
  );
}

export default DashView;
