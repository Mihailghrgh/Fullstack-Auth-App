"use server"
import VerificationSuccess from "@/components/AuthPage/VerifyEmail";

export const dynamic = 'force-dynamic';

function page() {
  return <VerificationSuccess />;
}
export default page;
