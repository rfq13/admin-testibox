"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../constants/vars";
import Loader from "../components/Loader";
import Wrapper from "./wrapper";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/auth";

export default function Page() {
  const token = localStorage.getItem(TOKEN_KEY);
  const router = useRouter();
  // const auth = useAuth() as any;

  // useEffect(() => {
  //   if (token) {
  //     auth.setToken(token);
  //   }
  // }, []);

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, []);

  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
}
