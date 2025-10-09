import SnippetForm from "@/components/snippet/SnippetForm";

export default function EditSnippetPage() {
  return (
    <div className="container">
      <h1 className="text-center text-2xl font-bold mt-6 mb-4">
        Create New Snippet
      </h1>
      <SnippetForm />
    </div>
  );
}
