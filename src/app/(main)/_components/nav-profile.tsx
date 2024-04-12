"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DEFAULT_AVATAR } from "@/lib/constants";
import {
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Moon,
    PlusCircle,
    User,
    UserPlus
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavProfile() {
  const { data: session } = useSession();

  if (!session)
    return (
      <Link href="/signin" passHref>
        <Button>Sign in</Button>
      </Link>
    );
  // const
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 rounded-md hover:scale-[0.98]	">
          <div className="relative w-[36px] h-[36px] rounded-full outline outline-1 outline-success">
            <Image
              src={session.user?.image ? session.user.image : DEFAULT_AVATAR}
              alt="user"
              fill
              sizes={"36px"}
              priority
              className="rounded-full bg-gray-200"
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]" align="end">
        <DropdownMenuGroup>
          <Link href={`/me`} passHref>
            <DropdownMenuItem className="group">
              <User className="mr-2 h-4 w-4 group-hover:text-primary" />
              <span>Public Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="group">
              <UserPlus className="mr-2 h-4 w-4 group-hover:text-primary" />
              <span>My Account</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="group">
                  <Mail className="mr-2 h-4 w-4 group-hover:text-primary" />
                  <span>Get Started</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="group">
                  <Mail className="mr-2 h-4 w-4 group-hover:text-primary" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="group">
                  <MessageSquare className="mr-2 h-4 w-4 group-hover:text-primary" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="group">
                  <MessageSquare className="mr-2 h-4 w-4 group-hover:text-primary" />
                  <span>Security</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="group">
                  <MessageSquare className="mr-2 h-4 w-4 group-hover:text-primary" />
                  <span>Members & Roles</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="group">
                  <MessageSquare className="mr-2 h-4 w-4 group-hover:text-primary" />
                  <span>Integrations</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="group">
                  <PlusCircle className="mr-2 h-4 w-4 group-hover:text-primary" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuItem className="group">
          <LifeBuoy className="mr-2 h-4 w-4 group-hover:text-primary" />
          <span>Support</span>
        </DropdownMenuItem>
        <Link href="https://devs.keenthemes.com" target="_blank" passHref>
          <DropdownMenuItem className="group">
            <MessageSquare className="mr-2 h-4 w-4 group-hover:text-primary" />
            <span>Devs Forum</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="group"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark mode</span>
          <DropdownMenuShortcut>
            <ThemeToggle />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <div className="mt-[12px] p-2.5 pt-0 hover:bg-none focus:none">
        <Button
          className="group w-full "
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4 group-hover:text-danger" />
          <span>Log out</span>
        </Button>
          
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
