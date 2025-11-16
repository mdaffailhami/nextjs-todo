import { signOut } from "@/lib/utils/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await signOut();
  const signinPageUrl = new URL("/signin", request.url);
  return NextResponse.redirect(signinPageUrl, 303);
}
