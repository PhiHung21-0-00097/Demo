"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

export default function Header() {
  const { accessToken, user, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold">
          SnippetHub
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          {accessToken && (
            <>
              <Link href="/snippets/create">Create Snippet</Link>
              <Link href="/profile">Profile</Link>
            </>
          )}
        </nav>

        <div className="flex gap-5">
          {accessToken ? (
            <>
              <Button variant="outline" className=" px-3 py-1 cursor-pointer">
                {user.name}
              </Button>
              <Button
                onClick={() => logout()}
                className="bg-red-500 text-white px-3 py-1 cursor-pointer"
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
      </div>
    </header>
  );
}
