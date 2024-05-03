"use client";
import React from "react";
import { theme } from "antd";

export default function Loader() {
  const utok = theme.useToken();
  const { colorBgContainer } = utok.token;
  return (
    <div
      className="flex justify-center items-center h-screen relative"
      style={{
        backgroundColor: colorBgContainer,
      }}
    >
      <div
        className="animate-spin rounded-full h-32 w-32 border-b-4"
        style={{
          borderColor: utok?.token?.colorBorderSecondary,
        }}
        role="status"
      ></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1">
        <img
          src="/icon.png"
          alt="ubox-white"
          className="mx-auto w-10 opacity-50"
        />
        <span className="text-center text-sm text-gray-800">Loading...</span>
      </div>
    </div>
  );
}
