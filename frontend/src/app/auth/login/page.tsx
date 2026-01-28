import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/components/AuthPage/Login";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("accessToken");

  if (cookie?.value) {
    redirect("/auth/user");
  }

  return <Login />;
}
