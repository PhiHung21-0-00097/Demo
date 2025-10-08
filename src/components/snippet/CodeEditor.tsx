"use client";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // giao diện tối
import "prismjs/components/prism-javascript"; // thêm ngôn ngữ JS, có thể import thêm
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";

interface CodeEditorProps {
  value: string;
  onChange: (code: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const lines = value.split("\n").length;
  return (
    <div className="flex border rounded overflow-hidden bg-[#1e1e1e]">
      {/* Column số dòng */}
      <div className="bg-[#2e2e2e] text-gray-400 px-2 text-right select-none">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="h-[1.5rem] leading-[1.5rem]">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Column editor */}
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages.javascript, "javascript")
        }
        padding={12}
        className="font-mono text-sm text-white w-full outline-none"
        style={{
          whiteSpace: "pre",
        }}
      />
    </div>
  );
}
