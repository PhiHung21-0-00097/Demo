"use client";
import { useCreateSnippetStore } from "@/stores/snippet/create-snippet.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import CodeEditor from "./CodeEditor";

export default function SnippetForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    tag: "",
  });
  const router = useRouter();

  const { createSnippet, loading } = useCreateSnippetStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result: any = await createSnippet(form);
    console.log("result", result);
    if (result.success) {
      toast.success("✅ Snippet created successfully!");
      router.push("/");
    } else {
      toast.error(result.message || "Failed to create snippet");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full border p-2 rounded"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border p-2 rounded"
        rows={3}
        value={form.description}
        onChange={handleChange}
      />

      <CodeEditor
        value={form.code}
        onChange={(code) => setForm((prev) => ({ ...prev, code }))}
      />

      <div className="flex gap-2">
        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>

        <input
          name="tag"
          type="text"
          placeholder="Tag (optional)"
          className="border p-2 rounded flex-1"
          value={form.tag}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Snippet"}
      </button>
    </form>
  );
}
