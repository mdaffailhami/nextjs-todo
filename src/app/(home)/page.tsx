import { checkSession } from "@/lib/utils/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "./sign-out-button";
import { Hero } from "./hero";
import { ProductList } from "./product-list";

export default async function HomePage() {
  const session = await checkSession();
  if (!session) return redirect("/signin");

  return (
    <div className="min-h-screen">
      <Hero />
      <ProductList />
      <SignOutButton />
    </div>
  );
}
