"use client";
import { SnippetCard } from "@/components/snippet/SnippetCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetSnippetStore } from "@/stores/snippet/get-snippet.store";

export default function HomePage() {
  const { snippets, fetchSnippets, loading } = useGetSnippetStore();
  console.log("snippets", snippets);
  // Lấy snippets
  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  return (
    <div className="container">
      <h1 className=" text-2xl font-semibold mb-6 ">Code Snippets</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snip) => (
          <SnippetCard key={snip._id} snippet={snip} />
        ))}
      </div>
    </div>
  );
}
