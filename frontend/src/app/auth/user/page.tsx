import UserPage from "@/components/UserPage/UserPage";
import { cookies } from "next/headers";
import ErrorBlock from "@/components/utils/ErrorBlock";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
async function page() {
  try {
    const data = await cookies();
    return <UserPage />;
  } catch (error) {
    console.log(error);
  }
}
export default page;
