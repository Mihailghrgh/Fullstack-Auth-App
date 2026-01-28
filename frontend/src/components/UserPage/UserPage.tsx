"use client";
import { userSessions } from "@/lib/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PreviousUserSessions from "./PreviousUserSessions";
import { logout } from "@/lib/api";
import { useEffect } from "react";

type DetailType = "sessions" | "logins" | null;

export default function UserPage() {
  const [activeDetail, setActiveDetail] = useState<DetailType>(null);
  const router = useRouter();


  const handleLogout = async () => {
    const response = await logout();

    if (response.status === 200) {
      router.push("/");
    }
  };

  const getUserData = async () => {
    try {
      const response = await userSessions();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["user"],
    staleTime: Infinity,
    queryFn: getUserData,
  });

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error occurred</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome, {data?.data.foundUser.email}
            </CardTitle>
            <CardDescription>ID: {data?.data.foundUser.userId}</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left sidebar with buttons */}
          <div className="space-y-4">
            <Button
              variant={activeDetail === "sessions" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setActiveDetail("sessions")}
            >
              User Sessions
            </Button>
            {/* <Button
              variant={activeDetail === "logins" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setActiveDetail("logins")}
            >
              Previous Logins
            </Button> */}
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Right content area */}
          <div className="md:col-span-2">
            {activeDetail === "sessions" && (
              <PreviousUserSessions userId={data?.data.foundUser.userId} />
            )}

            {!activeDetail && (
              <div className="flex items-center justify-center h-full min-h-[200px] border rounded-lg bg-white">
                <p className="text-gray-500">
                  Select an option to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
