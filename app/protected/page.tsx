
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";


export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="min-h-screen flex flex-row overflow-x-auto p-2">
      <Navigation />

      <div className="w-[400px] bg-[#151B3B] rounded-xl p-5 mx-1 shrink-0">
        <h2>Sales</h2>
      </div>
      <div className="w-[400px] bg-[#2C193A] rounded-xl p-5 mx-1 shrink-0">
        <h2>Marketing</h2>
      </div>
      <div className="w-[400px] bg-[#152C3B] rounded-xl p-5 mx-1 shrink-0">
        <h2>Operations</h2>
      </div>
      <div className="flex justify-center items-center w-[144px] bg-[#1C2337] rounded-xl p-5 mx-1 shrink-0">
        <Button>+</Button>
      </div>
    </main>
  );
}
