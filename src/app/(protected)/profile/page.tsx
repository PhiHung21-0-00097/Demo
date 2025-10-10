"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import User from "../../../../public/images/user.png";
import { useGetSnippetStore } from "@/stores/snippet/get-snippet-user.store";
import { SnippetCard } from "@/components/snippet/SnippetCard";
export default function ProfilePage() {
  const { snippets, fetchSnippets } = useGetSnippetStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading user profile...
      </div>
    );
  }
  return (
    <section>
      <div className="background min-h-[250px]"></div>
      {/* <div className="container">
        <div>
          <div>
            <div className="circle bg-red-500 h-52 w-52"></div>
          </div>
        </div>
      </div> */}
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className=" p-6 shadow-md flex flex-col md:flex-row gap-6 mx-auto relative">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="w-[250px] h-[250px] rounded-full overflow-hidden border-4 border-white shadow-lg transform -translate-y-1/3 mx-auto md:mx-0">
              <Image
                src={User} // 👉 thay bằng ảnh thật của user
                alt="Profile"
                width={250}
                height={250}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Info */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <Badge className="bg-blue-600 text-white">PRO ↑</Badge>
            </div>
            <p className="text-gray-600">{user.email}</p>

            <div className="flex gap-2 mt-4">
              <Button className="cursor-pointer">Edit</Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 md:mt-0 pl-5 border-l border-black text-center w-full">
            <div>
              <p className="text-base font-semibold">Snipet</p>
              <p className="text-xl font-semibold">{snippets.length}</p>
            </div>
          </div>
        </div>
        <div className="container py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {snippets.map((snip, i) => (
              <SnippetCard key={i} snippet={snip} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
