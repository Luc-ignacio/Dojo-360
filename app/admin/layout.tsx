import type { Metadata } from "next";
import { RocknRoll_One, Figtree } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Toaster } from "@/components/ui/sonner";
import { getUserByEmail } from "../actions/user";
import AdminTopBar from "@/components/AdminTopBar";

const rockNRoll = RocknRoll_One({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
});

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DOJO 360",
  description: "Master your management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  if (user) {
    const loggedUser = await getUserByEmail(user.email!);

    if (loggedUser && loggedUser.role !== "ADMIN") redirect("/member");
  }

  return (
    <html
      lang="en"
      className={cn("antialiased", rockNRoll.variable, figtree.variable)}
    >
      <body className="bg-white">
        <AdminTopBar user={user} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
