import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function NavMenuMObile() {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-black">
          <HiMenu />
        </Button>
      </SheetTrigger>
      <SheetContent className="pb-10">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="text-xl font-bold">
              SnippetDemo
            </Link>
          </SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex flex-col justify-between h-full">
          <nav className="flex flex-col items-center gap-2 mt-2">
            <Button variant="outline" className="text-black w-full">
              <Link href="/">Home</Link>
            </Button>
            {accessToken && (
              <>
                <Button variant="outline" className="text-black w-full">
                  <Link href="/snippets/create">Create Snippet</Link>
                </Button>
                <Button variant="outline" className="text-black w-full">
                  <Link href="/profile">Profile</Link>
                </Button>
              </>
            )}
          </nav>
          <div className="flex justify-between gap-2">
            {accessToken && (
              <Button
                onClick={() => logout()}
                className="w-full bg-red-500 text-white px-3 py-1 cursor-pointer"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
