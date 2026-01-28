"use server";
import Login from "@/components/AuthPage/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
async function LoginPage() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get("accessToken");
  if (cookie) {
    redirect("/auth/user");
  }
  return <Login />;
}
export default LoginPage;
