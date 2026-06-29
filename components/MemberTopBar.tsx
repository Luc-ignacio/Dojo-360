"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Profile } from "./profile";
import { User } from "@/app/generated/prisma/client";

export default function MemberTopBar({ user }: { user: User | null }) {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/member",
    },
    {
      name: "Members",
      href: "/member/members",
    },
    // {
    //   name: "Instructors",
    //   href: "/member/instructors",
    // },
    // {
    //   name: "Class Schedule",
    //   href: "/member/class-schedule",
    // },
    // {
    //   name: "Class Sessions",
    //   href: "/member/class-sessions",
    // },
    // {
    //   name: "Finance",
    //   href: "/member/finance",
    // },
  ];

  return (
    <div className=" bg-neutral-950 flex flex-col justify-center h-20">
      <div className="container mx-auto flex items-center justify-between">
        <Image
          src="/images/Dojo360-White.png"
          alt="DOJO360 Logo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-10 w-auto"
          priority
        />
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
