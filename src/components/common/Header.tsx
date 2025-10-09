"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { NavMenuMObile } from "../snippet/NavMenuMobile";

export default function Header() {
  const { accessToken, user, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <header className=" border-b shadow-sm text-white">
      <div className="container mx-auto  flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold">
          SnippetDemo
        </Link>

        <nav className="lg:flex items-center gap-4 hidden">
          <Button variant="outline" className="text-black">
            <Link href="/">Home</Link>
          </Button>
          {accessToken && (
            <>
              <Button variant="outline" className="text-black">
                <Link href="/snippets/create">Create Snippet</Link>
              </Button>
              <Button variant="outline" className="text-black">
                <Link href="/profile">Profile</Link>
              </Button>
            </>
          )}
        </nav>
        <div className="flex gap-2">
          <div className="gap-2 flex">
            {accessToken ? (
              <>
                <Button
                  variant="outline"
                  className="px-3 py-1 cursor-pointertext-black text-black"
                >
                  {user.name}
                </Button>
                <Button
                  onClick={() => logout()}
                  className="hidden lg:flex bg-red-500 text-white px-3 py-1 cursor-pointer"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                asChild
                onClick={handleLogout}
                className="bg-blue-500 text-white px-3 py-1 cursor-pointer"
              >
                {/* <Link href="/auth/login">Login</Link> */}
              </Button>
            )}
          </div>

          <div className="lg:hidden flex">
            <NavMenuMObile />
          </div>
        </div>
      </div>
    </header>
  );
}
