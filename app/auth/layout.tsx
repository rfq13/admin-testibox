import React from "react";
import Wrapper from "../wrapper";
import AuthContainer from "./components/AuthContainer";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Wrapper>
      <AuthContainer>
        <div className="flex justify-center items-center h-screen bg-[#e5e4e4] w-full">
          {children}
        </div>
      </AuthContainer>
    </Wrapper>
  );
};

export default RootLayout;
