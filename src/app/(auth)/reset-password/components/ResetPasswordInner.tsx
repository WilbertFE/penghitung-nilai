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
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import zxcvbn from "zxcvbn";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z
  .object({
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

export default function ResetPasswordInner() {
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordSuggestion, setPasswordSuggestion] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const result = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data.password, token }),
      });

      const parsedResult = await result.json();

      if (!result.ok) {
        toast.error(parsedResult.message);
        return setIsLoading(false);
      }

      toast.success(parsedResult.message);

      setPasswordStrength(0);
      setPasswordSuggestion([]);
      form.reset();
      setIsLoading(false);
      router.push("/signin");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  function handlePasswordStrength(password: string) {
    const evaluation = zxcvbn(password);
    setPasswordStrength(evaluation.score);
    setPasswordSuggestion(evaluation.feedback.suggestions);
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <Card className="w-full sm:max-w-md bg-white text-my-text my-12">
        <CardHeader>
          <CardTitle>Ganti Password</CardTitle>
          <CardDescription>Masukkan password baru Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Form (TIDAK DIUBAH) */}
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
              disabled={isLoading}
              type="reset"
              variant="outline"
              onClick={() => {
                setPasswordStrength(0);
                setPasswordSuggestion([]);
                form.reset();
              }}
            >
              Ulangi
            </Button>
            <Button disabled={isLoading} type="submit" form="form-rhf-demo">
              Ganti
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
