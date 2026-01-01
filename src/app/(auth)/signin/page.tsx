"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  email: z.email("Email tidak valid.").trim(),
  password: z.string().trim().min(1, "Password wajib diisi."),
});
export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await signIn("credentials", {
      callbackUrl: "/",
      ...data,
      redirect: false,
    });
    if (!result?.ok) {
      toast.error("Gagal masuk. Periksa kembali email dan password Anda.");
    } else {
      toast.success("Berhasil masuk!");
      form.reset();
      router.push("/");
    }
    setIsLoading(false);
  }
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
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <Card className="w-full sm:max-w-md bg-white text-my-text my-12">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Masuk ke akun Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Login with Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full gap-3 cursor-pointer"
            disabled={isLoading}
            onClick={handleGoogle}
          >
            <FcGoogle className="text-xl" />
            Masuk dengan Google
          </Button>
          {/* Divider */}
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ATAU</span>
            <Separator className="flex-1" />
          </div>
          {/* Existing Form (TIDAK DIUBAH) */}
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Masukkan email anda."
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="flex min-w-full max-w-sm items-center gap-2">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukkan password anda."
                        autoComplete="new-password"
                        type={isPasswordOpen ? "text" : "password"}
                      />
                      <Button
                        onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                        type="button"
                        variant="outline"
                      >
                        {isPasswordOpen ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <p className="w-full text-my-text">
            <Link
              href="/forgot-password"
              className="text-my-primary underline text-sm"
            >
              Lupa password?
            </Link>{" "}
          </p>
        </CardContent>

        <CardFooter className="flex-col justify-start gap-y-4">
          <Field orientation="horizontal">
            <Button
              disabled={isLoading}
              type="reset"
              variant="outline"
              onClick={() => form.reset()}
            >
              Ulangi
            </Button>
            <Button disabled={isLoading} type="submit" form="form-rhf-demo">
              Masuk
            </Button>
          </Field>
          <p className="w-full text-my-text">
            Belum punya akun?{" "}
            <Link href="/signup" className="text-my-primary underline">
              Daftar
            </Link>{" "}
            di sini.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
