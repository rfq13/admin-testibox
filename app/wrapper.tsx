import React from "react";
import THEME from "../constants/themes";

import StyledComponentsRegistry from "../lib/AntdRegistry";

import "./globals.css";
import { ConfigProvider } from "antd";
// import WrapperReactQuery from "../lib/Provider/ReactQueryProvider";

// export const DefaultLayoutContext = React.createContext<
//   {
//     exact: boolean;
//     path: string;
//     layout: React.Component;
//   } & any
// >({
//   exact: undefined,
//   path: undefined,
//   layout: undefined,
// });

const Wrapper = ({ children }: React.PropsWithChildren) => (
  <ConfigProvider theme={THEME}>
    {/* <WrapperReactQuery> */}
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    {/* </WrapperReactQuery> */}
  </ConfigProvider>
);

export default Wrapper;
