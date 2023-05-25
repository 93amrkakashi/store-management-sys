import Image from "next/image";
import { Inter } from "next/font/google";
import SignUp from "@/components/SignUp";
import SignIn from "@/pages/SignIn";
import HomePage from "./HomePage";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
        <HomePage />
    </>
  );
}
