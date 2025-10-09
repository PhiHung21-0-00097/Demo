import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-2 border p-2 rounded w-full">
      {tags.map((tag, i) => (
        <Badge key={i} variant="secondary" className="flex items-center gap-1">
          {tag}
          <Button size="icon" variant="ghost" onClick={() => removeTag(i)}>
            ×
          </Button>
        </Badge>
      ))}
      <Input
        placeholder="Add tag and press Enter"
        className="flex-1 min-w-[100px]"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
