/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Suspense } from "react";
import VerifyEmailFormInner from "./VerifyEmailFormInner";

export default function VerifyEmailForm() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmailFormInner />
    </Suspense>
  );
}
