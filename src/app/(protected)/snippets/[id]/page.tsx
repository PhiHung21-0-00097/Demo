import { Metadata } from "next";
import SnippetFormEdit from "../edit/page";

export async function generateMetadata({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const baseUrl = process.env.NEXTAUTH_URL || "https://demosnipet.vercel.app";
  const data = await fetch(`${baseUrl}/api/snippets/${resolvedParams.id}`, {
    cache: "no-store",
  }).then((r) => r.json());
  const snippet = data?.data;
  return {
    title: `${snippet.title} | Code Snippets`,
    description: snippet.description || "A shared code snippet by developers.",
    openGraph: {
      title: snippet.title,
      description: snippet.description,
      url: `https://demosnipet.vercel.app//snippet/${resolvedParams.id}`,
      type: "article",
    },
    twitter: {
      title: snippet.title,
      description: snippet.description,
    },
  };
}

export default function SnippetDetailPage() {
  return (
    <div className="bg-[#abb8c3] min-h-screen">
      <div className="container">
        <div className="h-screen">
          <h1 className="text-center text-2xl font-bold yt-6 mb-4 text-white">
            Please share the source code you like !!!
          </h1>
          <SnippetFormEdit />
        </div>
      </div>
    </div>
  );
}
