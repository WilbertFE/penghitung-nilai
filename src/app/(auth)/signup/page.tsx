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
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "Nama harus setidaknya 3 karakter")
      .max(64, "Nama paling banyak 64 karakter."),
    username: z
      .string()
      .min(3, "Username harus setidaknya 3 karakter.")
      .max(32, "Username paling banyak 32 karakter."),
    email: z.email("Email tidak valid."),
    password: z
      .string()
      .min(8, "Password harus setidaknya 8 karakter.")
      .max(64, "Password paling banyak 64 karakter.")
      .refine((value) => zxcvbn(value).score >= 3, {
        message: "Password terlalu lemah.",
      }),
    confirmPassword: z
      .string()
      .min(8, "Password harus setidaknya 8 karakter.")
      .max(64, "Password paling banyak 64 karakter."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama.",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordSuggestion, setPasswordSuggestion] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handlePasswordStrength(password: string) {
    const evaluation = zxcvbn(password);
    setPasswordStrength(evaluation.score);
    setPasswordSuggestion(evaluation.feedback.suggestions);
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message);
        return setIsLoading(false);
      }

      toast.success(responseData.message);

      setPasswordStrength(0);
      setPasswordSuggestion([]);
      form.reset();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center px-4">
      <Card className="w-full sm:max-w-md bg-white text-my-text my-12">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Buat akun baru.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="full_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Masukkan nama lengkap anda."
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Masukkan username anda."
                      autoComplete="username"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                    <div className="flex w-full max-w-sm items-center gap-2">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukkan password anda."
                        autoComplete="new-password"
                        type={isPasswordOpen ? "text" : "password"}
                        onChange={(e) => {
                          field.onChange(e);
                          handlePasswordStrength(e.target.value);
                        }}
                      />
                      <Button
                        onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                        type="button"
                        variant="outline"
                      >
                        {isPasswordOpen ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            passwordStrength === 0
                              ? "bg-transparent"
                              : passwordStrength === 1
                              ? "bg-red-500"
                              : passwordStrength === 2
                              ? "bg-orange-500"
                              : passwordStrength === 3
                              ? "bg-green-500"
                              : "bg-green-700"
                          }`}
                          style={{ width: `${passwordStrength * 25}%` }}
                        ></div>
                      </div>
                    </div>
                    {passwordSuggestion.length > 0 && (
                      <ul className="mt-2">
                        {passwordSuggestion.map((suggestion, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 list-inside list-disc"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Konfirmasi Password
                    </FieldLabel>
                    <div className="flex w-full max-w-sm items-center gap-2">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Ulangi password anda."
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
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                form.reset();
                setPasswordStrength(0);
                setPasswordSuggestion([]);
              }}
            >
              Ulangi
            </Button>
            <Button disabled={isLoading} type="submit" form="form-rhf-demo">
              Buat akun
            </Button>
          </Field>
          <p className="w-full text-my-text">
            Sudah punya akun?{" "}
            <Link href="/signin" className="text-my-primary underline">
              Login
            </Link>{" "}
            di sini.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
