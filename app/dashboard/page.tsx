"use client";

import { Breadcrumb, Button, Typography } from "antd";
import { useAuth } from "../../store/auth";
import ContentBlanket from "./components/ContentBlanket";

export default function Page() {
  const auth = useAuth() as any;
  return (
    <ContentBlanket title="Dasbor Admin">
      <Typography.Text className="font-semibold text-lg">
        Selamat datang, {auth?.user?.name ?? "john"}!
      </Typography.Text>
    </ContentBlanket>
  );
}
