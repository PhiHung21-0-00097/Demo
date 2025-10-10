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
  framework: string;
  title: string;
  desc: string;
}

export default function CodeEditor({
  value,
  onChange,
  framework,
  title,
  desc,
}: CodeEditorProps) {
  const lines = value.split("\n").length;
  return (
    <div className="">
      <div className="terminal-header bg-zinc-700 text-white p-2 rounded-t-lg xs:flex items-center">
        <div>
          <span className="text-red-500 text-5xl   -mt-2">•</span>
          <span className="text-yellow-500 text-5xl   -mt-2 ml-1">•</span>
          <span className="text-green-500 text-5xl   -mt-2 ml-1">•</span>
        </div>
        <span className="capitalize ml-4 align-baseline">
          {framework} --- bash - zsh {title && `-- ${title}`}{" "}
          {desc && `-- ${desc}`}
        </span>
      </div>
      <div className="flex   overflow-hidden bg-[#1e1e1e]">
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
          className="font-mono text-sm text-white w-full outline-none "
          style={{
            whiteSpace: "pre",
          }}
        />
      </div>
    </div>
  );
}
