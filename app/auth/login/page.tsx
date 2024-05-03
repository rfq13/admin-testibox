import React from "react";
import Login from "./Login";

export const metadata = {
  title: "Abstren Auth Login Page",
  description: "Nonok Sugarwandot",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-white w-full">
      <Login />
    </div>
  );
}
