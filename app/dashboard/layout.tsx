import React from "react";

import Wrapper from "../wrapper";
import DashboardContainer from "./components/DashboardContainer";

export const metadata = {
  title: "Abstren Dashboard Layout",
  description: "Nonok Sugarwandot",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Wrapper>
      <DashboardContainer>{children}</DashboardContainer>
    </Wrapper>
  );
};

export default RootLayout;
