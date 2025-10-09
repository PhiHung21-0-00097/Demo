"use client";
import { SnippetCard } from "@/components/snippet/SnippetCard";
import { useEffect } from "react";
import { useGetSnippetStore } from "@/stores/snippet/get-snippet.store";

export default function HomePage() {
  const { snippets, fetchSnippets } = useGetSnippetStore();
  console.log("snippets", snippets);
  // Lấy snippets
  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  return (
    <div className="bg-[#abb8c3] h-screen">
      <div className="container">
        <h1 className=" text-2xl font-semibold mb-6 ">Code Snippets</h1>
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {snippets.map((snip, i) => (
            <SnippetCard key={i} snippet={snip} />
          ))}
        </div>
      </div>
    </div>
  );
}
