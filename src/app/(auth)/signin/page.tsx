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
import zxcvbn from "zxcvbn";
import { signIn } from "next-auth/react";
import Link from "next/link";

const formSchema = z.object({
  email: z.email("Email tidak valid."),
  password: z
    .string()
    .min(8, "Password harus setidaknya 8 karakter.")
    .max(64, "Password paling banyak 64 karakter.")
    .refine((value) => zxcvbn(value).score >= 3, {
      message: "Password terlalu lemah.",
    }),
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await signIn("credentials", { callbackUrl: "/", ...data, redirect: false });
    form.reset();
  }
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <Card className="w-full sm:max-w-md bg-white text-my-text my-12">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Masuk ke akun Anda.</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex-col justify-start gap-y-4">
          <Field orientation="horizontal">
            <Button type="reset" variant="outline" onClick={() => form.reset()}>
              Ulangi
            </Button>
            <Button type="submit" form="form-rhf-demo">
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
