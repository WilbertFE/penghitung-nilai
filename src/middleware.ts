/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import withAuth from "./app/middlewares/withAuth";

const requiredAuthPages = [
  "/dashboard",
  "/add-semester",
  "/profile",
  "/settings",
];

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [...requiredAuthPages]);
