"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  console.log("sessionn data : ", session);
  console.log("status : ", status);
  return (
    <div>
      <Button variant="destructive" type="button" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
