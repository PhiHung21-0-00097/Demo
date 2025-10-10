import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response";
import { Snippet } from "@/types/snippet.type";
import { create } from "zustand";

interface GetSnippetStore {
  snippet: Snippet | null;
  loading: boolean;
  error: string | null;
  fetchSnippet: (id: string) => Promise<ApiResponse<Snippet>>;
}

export const useGetSlugSnippetStore = create<GetSnippetStore>((set) => ({
  snippet: null,
  loading: false,
  error: null,

  fetchSnippet: async (id: string) => {
    try {
      set({ loading: true, error: null });

      const res: any = await api.get<ApiResponse<Snippet>>(`/snippets/${id}`);

      if (!res.success) {
        throw new Error(res.message || "Fetch snippet failed");
      }

      set({
        snippet: res.data || null,
        loading: false,
        error: null,
      });

      return res;
    } catch (err: any) {
      console.error("❌ Fetch snippet error:", err);
      set({ snippet: null, loading: false, error: err.message });
      return { success: false, message: err.message, data: null };
    }
  },
}));
