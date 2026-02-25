/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { newVerification } from "@/lib/new-verification";

export default function VerifyEmailFormInner() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // ⛔ Jangan eksekusi apa pun sebelum token tersedia
    if (!token) return;

    let isMounted = true;

    newVerification(token)
      .then((data: any) => {
        if (!isMounted) return;

        if (data?.success) {
          setSuccess(data.success);
          // Redirect setelah 3 detik
          setTimeout(() => {
            router.push("/signin");
          }, 3000);
        } else if (data?.error) setError(data.error);
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
