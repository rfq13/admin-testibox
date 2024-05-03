import React from "react";
import Wrapper from "../wrapper";
import AuthContainer from "./components/AuthContainer";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Wrapper>
      <AuthContainer>{children}</AuthContainer>
    </Wrapper>
  );
};

export default RootLayout;
