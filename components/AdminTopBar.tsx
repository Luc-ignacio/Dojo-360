"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Profile } from "./profile";
import { User } from "@supabase/supabase-js";

export default function AdminTopBar({ user }: { user: User | null }) {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Members",
      href: "/admin/members",
    },
    {
      name: "Instructors",
      href: "/admin/instructors",
    },
    {
      name: "Class Schedule",
      href: "/admin/class-schedule",
    },
    {
      name: "Class Sessions",
      href: "/admin/class-sessions",
    },
    // {
    //   name: "Finance",
    //   href: "/admin/finance",
    // },
  ];

  return (
    <div className=" bg-neutral-950 flex flex-col justify-center h-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-center">
          <Image
            src="/images/Dojo360-White.png"
            alt="DOJO360 Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-10 w-auto"
            priority
          />
          <span className="text-neutral-300 uppercase text-sm font-medium">
            Admin App
          </span>
        </div>
        <nav className="flex bg-neutral-800 text-white font-medium rounded-full w-fit mx-auto">
          {menus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className={`px-6 py-2 rounded-full
            ${pathname === menu.href ? "bg-white text-neutral-900" : ""}
          `}
            >
              {menu.name}
            </Link>
          ))}
        </nav>

        <Profile user={user} />
      </div>
    </div>
  );
}
