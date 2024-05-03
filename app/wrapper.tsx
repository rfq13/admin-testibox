import React from "react";
import THEME from "../constants/themes";

import StyledComponentsRegistry from "../lib/AntdRegistry";

import "./globals.css";
import { ConfigProvider } from "antd";

const Wrapper = ({ children }: React.PropsWithChildren) => (
  <ConfigProvider theme={THEME}>
    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
  </ConfigProvider>
);

export default Wrapper;
