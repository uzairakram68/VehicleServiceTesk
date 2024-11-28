import Image from "next/image";
import RootLayout from "./layout";
import Login from "@/views/Login/Login";

export default function Home() {
  return (
    <RootLayout>
      <Login />
    </RootLayout>
  );
}
