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
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .email("Email tidak valid.")
    .trim()
    .transform((v) => v.toLowerCase()),
});
export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await fetch("/api/users/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    const parsedResult = await result.json();

    if (!result.ok) {
      toast.error(parsedResult.message || "Terjadi kesalahan.");
    } else {
      toast.success(
        parsedResult.message ||
          "Email reset password berhasil dikirim! Periksa email Anda."
      );
      form.reset();
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <Card className="w-full sm:max-w-md bg-white text-my-text my-12">
        <CardHeader>
          <CardTitle>Lupa Password</CardTitle>
          <CardDescription>
            Masukkan email Anda untuk mengatur ulang password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            </FieldGroup>
          </form>
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
              Kirim
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
