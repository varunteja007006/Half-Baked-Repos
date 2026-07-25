import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-8 container grid place-items-center">
      <div className="card w-full max-w-lg">
        <div className="flex items-center justify-between">
          <h2>Private</h2>
          <LogoutButton />
        </div>
        <p className="muted mt-2">Hello {data.user.email}</p>
      </div>
    </div>
  );
}
