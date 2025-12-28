/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { newVerification } from "@/../actions/new-verification";

export default function VerifyEmailForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // ⛔ Jangan eksekusi apa pun sebelum token tersedia
    if (!token) return;

    let isMounted = true;

    newVerification(token)
      .then((data: any) => {
        if (!isMounted) return;

        if (data?.success) setSuccess(data.success);
        else if (data?.error) setError(data.error);
        else setError("Invalid verification response");
      })
      .catch(() => {
        if (isMounted) {
          setError("An unexpected error occurred");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Confirming your email address"
      title="Confirming now..."
      backButtonHref="/signin"
      backButtonLabel="Back to sign in"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <p>Loading...</p>}
        {success && <FormSuccess message={success} />}
        {!success && error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
