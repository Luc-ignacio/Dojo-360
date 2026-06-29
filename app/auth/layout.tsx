import type { Metadata } from "next";
import { RocknRoll_One, Noto_Sans, Figtree } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased font-sans",
        rockNRoll.variable,
        figtree.variable,
      )}
    >
      <body className="bg-white">{children}</body>
    </html>
  );
}
