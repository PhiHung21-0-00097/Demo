"use client";

import CodeEditor from "@/components/snippet/CodeEditor";
import { listFramework } from "@/components/snippet/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSnippetStore } from "@/stores/snippet/create-snippet.store";
import { useGetSlugSnippetStore } from "@/stores/snippet/get-id-snippet.store";
import { analyzeComplexity } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SnippetFormEdit() {
  const { updateSnippet } = useCreateSnippetStore();
  const { id } = useParams();
  const snippetId = Array.isArray(id) ? id[0] : id;
  const { snippet, fetchSnippet, loading, error } = useGetSlugSnippetStore();
  const [timeComplexity, setTimeComplexity] = useState<string | null>(null);
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    tags: [] as string[],
  });

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add tag
  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !form.tags.includes(trimmed)) {
      setForm({ ...form, tags: [...form.tags, trimmed] });
    }
  };

  // Remove tag
  const removeTag = (index: number) => {
    setForm({ ...form, tags: form.tags.filter((_, i) => i !== index) });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!snippetId) return;

    const result: any = await updateSnippet(snippetId, form);

    if (result.success) {
      toast.success("✅ Snippet updated successfully!");
      router.push(`/profile`);
    } else {
      toast.error(result.message || "Failed to update snippet");
    }
  };
  useEffect(() => {
    setTimeComplexity(analyzeComplexity(form.code));
  }, [form.code]);

  useEffect(() => {
    if (snippet) {
      setForm({
        title: snippet.title || "",
        description: (snippet as any).description || "",
        code: snippet.code || "",
        language: snippet.language || "javascript",
        tags: (snippet as any).tags || [],
      });
    }
  }, [snippet]);

  useEffect(() => {
    if (id) fetchSnippet(snippetId);
  }, [id, fetchSnippet]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!snippet) return <p>Snippet not found</p>;

  return (
    <div className="p-4 bg-zinc-700 rounded-md max-w-6xl mx-auto border-2 border-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Top fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            className="flex-1  text-white"
            value={form.title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="flex-1 min-h-[37px]  text-white"
          />

          <Select
            value={form.language}
            onValueChange={(val) => setForm({ ...form, language: val })}
          >
            <SelectTrigger className="max-w-[180px] text-white">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {listFramework.map((item, i) => (
                  <SelectItem key={i} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Tags input */}
        <div className="flex flex-wrap gap-2 items-center">
          {form.tags.map((tag, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="flex items-center gap-1 py-0 pr-0"
            >
              {tag}
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="cursor-pointer "
                onClick={() => removeTag(i)}
              >
                ×
              </Button>
            </Badge>
          ))}
          <Input
            placeholder="Add tag and press Enter"
            className="flex-1 min-w-[100px] text-white "
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>

        {/* Code editor */}
        <div className="p-4 bg-[#1e1e1e] rounded">
          <CodeEditor
            framework={form.language}
            title={form.title}
            desc={form.description}
            value={form.code}
            onChange={(code) => setForm({ ...form, code })}
          />
        </div>
        {/* Hiển thị ước lượng complexity */}
        {timeComplexity && (
          <p className="text-yellow-400 font-mono">
            ⏱ Estimated Time Complexity: {timeComplexity}
          </p>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white"
          >
            {loading ? "Creating..." : "Save Snippet"}
          </Button>
        </div>
      </form>
    </div>
  );
}
