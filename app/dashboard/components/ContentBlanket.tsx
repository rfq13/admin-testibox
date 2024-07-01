"use client";

import { Breadcrumb, BreadcrumbProps, Typography } from "antd";
import React from "react";

interface ContentBlanketProps {
  title?: string;
  breadcrumb?: BreadcrumbProps;
  children: React.ReactNode;
  header?: React.ReactNode;
}

export default function ContentBlanket({
  title,
  breadcrumb,
  children,
  header,
}: ContentBlanketProps) {
  return (
    <>
      {breadcrumb && <Breadcrumb {...breadcrumb} />}
      {title && (
        <Typography.Title level={2} style={{ margin: "16px 0" }}>
          {title}
        </Typography.Title>
      )}
      <div
        className={`flex min-h-screen flex-col bg-white rounded-md ${
          typeof header === "undefined" ? "p-6" : ""
        }`}
      >
        {header}
        <div className={typeof header === "undefined" ? "" : "p-6"}>
          {children}
        </div>
      </div>
    </>
  );
}
