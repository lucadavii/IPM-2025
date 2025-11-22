import {ReactNode} from "react";
import {redirect} from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
    const supabase = await createSupabaseServerClient();
    const {data: {user}} = await supabase.auth.getUser();
    
    if (!user) {
        redirect('/login');
    }
    return <>{children}</>;
}