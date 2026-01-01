/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Suspense } from "react";
import ResetPasswordInner from "./ResetPasswordInner";

export default function ResetPassword() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordInner />
    </Suspense>
  );
}
