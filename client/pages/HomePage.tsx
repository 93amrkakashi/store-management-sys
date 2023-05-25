import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/rtk/store";
import { useRouter } from "next/router";
import SignIn from "./SignIn";

const HomePage: React.FC = () => {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user);
if(!user){
  router.push("/SigiIn")
}
  return (
    <>
    {!user ? <SignIn /> : "kjgjhgjhg"}
   </>
  );
};

export default HomePage;
