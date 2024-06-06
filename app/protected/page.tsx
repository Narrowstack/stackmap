import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navigation from "./navigation";
import { createClient } from "@/utils/supabase/server";
import Stackmap from "./stackmap";

export default async function ProtectedPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="min-h-screen flex flex-row p-2">
      <Navigation />
      <Stackmap />
    </main>
  );
}
