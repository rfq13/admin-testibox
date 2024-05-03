"use client";

import { Button } from "antd";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        type="primary"
        onClick={() => {
          console.log("Hello, world!");
          alert("Hello, world!");
        }}
      >
        Hello, Gio!
      </Button>
    </main>
  );
}
