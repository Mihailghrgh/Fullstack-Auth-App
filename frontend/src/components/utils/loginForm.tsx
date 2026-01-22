"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useCreateError } from "./store";

type ErrorMsg = {
  status: number;
  message: string;
};
export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must contain '@' " })
    .min(6, { message: "Email must be between 6 and 50 character" })
    .max(50, { message: "Email must be between 6 and 50 character" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .max(50, { message: "Password must contain max 50 characters" }),
});

export function ProfileForm() {
  const [errMsg, setErrMsg] = useState<string>("");
  const { clearError } = useCreateError();
  useEffect(() => {
    clearError();
  }, []);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const route = useRouter();

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const data = {
        email: values.email,
        password: values.password,
        confirmPassword: values.password,
      };
      const response = await login(data);
      console.log(response);

      if (response.status === 200) {
        route.push("/auth/user");
        useCreateError.getState().clearError();
      }

      if (axios.isAxiosError(response) || response.status === 401) {
        console.log("Error occurred");
        setErrMsg("Error occurred");
      }
    } catch (error: unknown) {
      console.log(error);
      const status = error?.status ?? 500;
      const message = error?.message ?? "Something went wrong";
      useCreateError.getState().setErrorObject(status, message);
      if (axios.isAxiosError(error)) {
        const status = error?.status ?? 500;
        const message = error?.message ?? "Something went wrong";
        useCreateError.getState().setErrorObject(status, message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} />
              </FormControl>
              <FormDescription>This is a test message.</FormDescription>
              <FormMessage />
              <h1 className="text-sm text-blue-600 text-end">
                <Link href="/password/forgot">forgot password</Link>
              </h1>
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-center items-center">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <h1 className="text-sm mt-4">
            {" "}
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-800"
            >
              register!
            </Link>
          </h1>
        </div>
      </form>
    </Form>
  );
}
