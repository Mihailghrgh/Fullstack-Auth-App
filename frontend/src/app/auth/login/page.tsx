"use server";
import Login from "@/components/AuthPage/Login";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
async function LoginPage() {
  const cookieStore = await cookies();
  const router = useRouter();
  const cookie = cookieStore.get("accessToken");
  if (cookie) {
    router.push("/auth/user");
  }
  return <Login />;
}
export default LoginPage;
