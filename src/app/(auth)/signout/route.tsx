import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookies = await nextCookies();

  // Sign user out
  cookies.delete("session_token");

  // Redirect user
  return redirect("/signin");
}
