"use server";

import ErrorBlock from "@/components/utils/ErrorBlock";
import ResetPasswordForm from "@/components/utils/resetPasswordForm";
import { checkResetCode } from "@/lib/api";
async function page({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; exp?: string }>;
}) {
  try {
    const data = await searchParams;
    await checkResetCode(data);
    return <ResetPasswordForm code={data.code || ""} />;
  } catch (error) {
    console.log(error);
    return <ErrorBlock message="Invalid reset link or expired" />;
  }
}
export default page;
