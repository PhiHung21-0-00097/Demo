import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response";
import { Snippet } from "@/types/snippet.type";
import { create } from "zustand";

interface GetSnippetStore {
  snippets: Snippet[];
  loading: boolean;
  error: string | null;
  fetchSnippets: () => Promise<ApiResponse<Snippet[]>>;
}

export const useGetSnippetStore = create<GetSnippetStore>((set) => ({
  snippets: [],
  loading: false,
  error: null,

  fetchSnippets: async () => {
    try {
      set({ loading: true, error: null });

      const res: any = await api.get<ApiResponse<Snippet[]>>("/snippets/user");

      if (!res.success) {
        throw new Error(res.message || "Fetch failed");
      }

      set({
        snippets: res.data || [],
        loading: false,
        error: null,
      });

      return res.data;
    } catch (err: any) {
      console.error("❌ Fetch snippets error:", err);
      set({ error: err.message, loading: false });
      return { success: false, message: err.message, data: [] };
    }
  },
}));
