"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

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

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username harus setidaknya 3 karakter.")
    .max(32, "Username paling banyak 32 karakter."),
  email: z.email("Email tidak valid."),
  password: z
    .string()
    .min(8, "Password harus setidaknya 8 karakter.")
    .max(64, "Password paling banyak 64 karakter."),
  confirmPassword: z
    .string()
    .min(8, "Password harus setidaknya 8 karakter.")
    .max(64, "Password paling banyak 64 karakter."),
});

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(true);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordSuggestion, setPasswordSuggestion] = useState<string[]>([]);

  function handlePasswordStrength(password: string) {
    const evaluation = zxcvbn(password);
    console.log("evaluation : ", evaluation);
    setPasswordStrength(evaluation.score);
    setPasswordSuggestion(evaluation.feedback.suggestions);
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data : ", data.username);
    if (data.password !== data.confirmPassword) {
      toast.error("Password harus sama!");
    } else {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
      toast.success("Akun berhasil dibuat");
      setPasswordStrength(0);
      setPasswordSuggestion([]);
      form.reset();
    }
  }
  return (
    <Card className="w-full sm:max-w-md mx-auto bg-white text-my-text my-12">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Buat akun baru.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                      autoComplete="off"
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
                            ? "bg-red-500"
                            : passwordStrength === 1
                            ? "bg-orange-500"
                            : passwordStrength === 2
                            ? "bg-yellow-500"
                            : passwordStrength >= 3
                            ? "bg-green-500"
                            : "bg-green-700"
                        }`}
                        style={{ width: `${(passwordStrength + 1) * 25}%` }}
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
                      autoComplete="off"
                      type={isPasswordOpen ? "text" : "password"}
                    />
                    <Button
                      onClick={() => setIsPasswordOpen(isPasswordOpen)}
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
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setPasswordStrength(0);
              setPasswordSuggestion([]);
            }}
          >
            Ulangi
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Buat akun
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" variant="outline">
        Subscribe
      </Button>
    </div>
  );
}
