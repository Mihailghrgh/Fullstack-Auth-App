"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { forgotPassword } from "@/lib/api";
import {
  Form,
  FormItem,
  FormDescription,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "../ui/form";
import { TriangleAlert } from "lucide-react";
import ResetPasswordConfirmation from "./resetPasswordSuccess";
import { useCreateError } from "./store";
import axios from "axios";
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .min(6, { message: "Email must be at least 6 characters long" })
    .max(50, { message: "Email cannot be more than 50 characters" }),
});

function ForgotPasswordForm() {
  const [activePage, setActivePage] = useState<boolean>(false);
  const error = useCreateError((state) => state.error);
  const clearError = useCreateError((state) => state.clearError);
  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    clearError();
  }, []);

  const handleFormSubmit = async (
    values: z.infer<typeof forgotPasswordSchema>,
  ) => {
    try {
      await forgotPassword(values);
      setActivePage(true);
    } catch (error) {
      useCreateError.getState().clearError();
      console.log(error);
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? "Something went wrong";
      useCreateError.getState().setErrorObject(status, message);
      // setErrorMessage(error.message );
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500;
        const message = error.response?.data?.message ?? "Something went wrong";
        console.log("triggered");
        useCreateError.getState().setErrorObject(status, message);
      }
    }
  };
  return activePage === false ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-300 rounded-xl w-fit border-12 border-red-300 flex justify-center  text-center items-center transition-opacity duration-300">
                <TriangleAlert className="h-4 w-4" /> <p> {error.message}</p>
              </div>
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we`ll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(handleFormSubmit)}
              className="space-y-2"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jane_doe@gmail.com" {...field} />
                      </FormControl>
                      <FormDescription>This is a test message.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <div className="flex flex-col justify-center items-center space-y-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full hover:cursor-pointer"
                >
                  Submit
                </Button>

                <Button
                  variant="default"
                  type="button"
                  className="flex flex-col justify-center items-center w-full hover:cursor-pointer"
                >
                  <Link href="/auth/login">Back to login</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  ) : (
    <>
      <ResetPasswordConfirmation />
    </>
  );
}
export default ForgotPasswordForm;
