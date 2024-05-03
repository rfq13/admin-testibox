"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { TOKEN_KEY } from "../constants/vars";
import Loader from "../components/Loader";
import Wrapper from "./wrapper";
import { useRouter } from "next/navigation";

export default function Page() {
  const token = Cookies.get(TOKEN_KEY);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [token]);

  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
}
