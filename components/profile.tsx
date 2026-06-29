import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout-button";
import { LogOutIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/app/generated/prisma/client";

export function Profile({ user }: { user: User | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar size="lg">
            <AvatarImage src={user?.avatarUrl ?? undefined} alt={user?.name} />

            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full">
        <DropdownMenuItem>
          <UserIcon />
          <pre>{user?.email}</pre>
        </DropdownMenuItem>

        {/* <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>

        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
