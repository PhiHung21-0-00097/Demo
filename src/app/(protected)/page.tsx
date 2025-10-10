"use client";
import { useTranslation } from "react-i18next";
import { SnippetCard } from "@/components/snippet/SnippetCard";
import { useEffect } from "react";
import { useGetAllSnippetStore } from "@/stores/snippet/get-all-snippet.store";

export default function HomePage() {
  const { t } = useTranslation("common");
  const { snippets, fetchAllSnippets } = useGetAllSnippetStore();
  useEffect(() => {
    fetchAllSnippets();
  }, [fetchAllSnippets]);

  return (
    <div className="bg-[#abb8c3] min-h-screen px-2 lg:px-0">
      <div className="container">
        <h1 className=" text-2xl font-semibold mb-6 ">
          {t("home.codeSnippets")}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {snippets.map((snip, i) => (
          <SnippetCard key={i} snippet={snip} />
        ))}
      </div>
    </div>
  );
}
