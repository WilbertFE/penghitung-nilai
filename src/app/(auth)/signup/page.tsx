"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogle = async () => {
    setIsLoading(true);
    const result = await signIn("google", { callbackUrl: "/" });

    if (!result?.ok) {
      toast.error("Terjadi kesalahan.");
    } else {
      toast.success("Berhasil masuk!");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
          <CardDescription>
            Pilih metode pendaftaran yang kamu inginkan
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Signup with Google */}
          <Button
            variant="outline"
            className="w-full gap-3 cursor-pointer"
            disabled={isLoading}
            onClick={handleGoogle}
          >
            <FcGoogle className="text-xl" />
            Daftar dengan Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ATAU</span>
            <Separator className="flex-1" />
          </div>

          {/* Signup with Email */}
          <Button asChild className="w-full">
            <Link href="/signup/email">Daftar dengan Email</Link>
          </Button>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            Dengan mendaftar, kamu menyetujui{" "}
            <span className="font-medium text-foreground">
              Syarat & Ketentuan
            </span>{" "}
            kami
          </p>

          {/* Already have account */}
          <p className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/signin" className="text-blue-600 underline">
              Masuk
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
