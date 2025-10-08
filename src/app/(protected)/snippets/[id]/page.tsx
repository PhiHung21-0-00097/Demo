import { notFound } from "next/navigation";

export default async function SnippetDetail({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/snippets/${params.id}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  if (!data?.title) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <pre className="bg-gray-900 text-white p-4 rounded-xl overflow-x-auto">
        <code>{data.code}</code>
      </pre>
      <p className="mt-3 text-gray-600">
        Language: <b>{data.language}</b>
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {data.tags.map((t: string) => (
          <span key={t} className="bg-gray-200 text-xs px-2 py-1 rounded">
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}
