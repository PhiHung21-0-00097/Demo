export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${params.id}`,
    {
      cache: "no-store",
    }
  );
  const user = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{user.name}</h1>
      <p className="text-gray-600 mb-6">{user.email}</p>
      <h2 className="font-semibold mb-2">Snippets by {user.name}:</h2>
      {/* TODO: render user snippets */}
    </div>
  );
}
