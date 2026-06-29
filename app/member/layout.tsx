import type { Metadata } from "next";
import { RocknRoll_One, Figtree } from "next/font/google";
import "../globals.css";
import MemberTopBar from "@/components/MemberTopBar";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Toaster } from "@/components/ui/sonner";
import { getUserByEmail } from "../actions/user";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { UserProvider } from "@/components/UserProvider";

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
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <html
      lang="en"
      className={cn("antialiased", rockNRoll.variable, figtree.variable)}
    >
      <body className="bg-white">
        <UserProvider user={user}>
          <MemberTopBar user={user} />
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
