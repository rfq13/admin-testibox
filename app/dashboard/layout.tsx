import React from "react";

import Wrapper from "../wrapper";
import DashboardContainer from "./components/DashboardContainer";

export const metadata = {
  title: "Dashboard Page | Testibox",
  description: "Testibox - tesimoni dari hati",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Wrapper>
      <DashboardContainer>{children}</DashboardContainer>
    </Wrapper>
  );
};

export default RootLayout;
