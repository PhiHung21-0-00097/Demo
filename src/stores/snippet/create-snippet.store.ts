import { api } from "@/lib/api";
import { create } from "zustand";

interface CreateSnippetInput {
  title: string;
  code: string;
  description: string;
  language: string;
  tag: string;
}

interface CreateSnippetStore {
  loading: boolean;
  error: string | null;
  success: boolean;
  createSnippet: (
    form: CreateSnippetInput
  ) => Promise<{ success: boolean; message?: string }>;
}

export const useCreateSnippetStore = create<CreateSnippetStore>((set) => ({
  loading: false,
  error: null,
  success: false,

  createSnippet: async (form) => {
    try {
      set({ loading: true, error: null, success: false });
      const res = await api.post("/snippets", form);

      set({ loading: false, success: true });
      return { success: true, message: "Created successfully", data: res };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err.message || "Create failed";
      console.error("❌ Create snippet error:", msg);

      set({ error: msg, loading: false, success: false });
      return { success: false, message: msg };
    }
  },
}));
