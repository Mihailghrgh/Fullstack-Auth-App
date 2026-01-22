"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/utils/loginForm";
import { useCreateError } from "../utils/store";
import { TriangleAlert } from "lucide-react";
export default function Login() {
  const err = useCreateError((state) => state.error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          {err && (
            <div className="flex justify-center">
              <div className="bg-red-300 rounded-xl w-fit border-12 border-red-300 flex justify-center  text-center items-center transition-opacity duration-300">
                <TriangleAlert className="h-4 w-4" />{" "}
                <p> Email does not exist, Please try again!</p>
              </div>
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
