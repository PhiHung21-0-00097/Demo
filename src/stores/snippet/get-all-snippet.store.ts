import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response";
import { Snippet } from "@/types/snippet.type";
import { create } from "zustand";

interface GetAllSnippetStore {
  snippets: Snippet[];
  loading: boolean;
  error: string | null;
  fetchAllSnippets: () => Promise<ApiResponse<Snippet[]>>;
}

export const useGetAllSnippetStore = create<GetAllSnippetStore>((set) => ({
  snippets: [],
  loading: false,
  error: null,

  fetchAllSnippets: async () => {
    try {
      set({ loading: true, error: null });

      const res: any = await api.get<ApiResponse<Snippet[]>>("/snippets");

      if (!res.success) {
        throw new Error(res.message || "Fetch all snippets failed");
      }

      set({
        snippets: res.data || [],
        loading: false,
        error: null,
      });

      return res;
    } catch (err: any) {
      console.error("❌ Fetch all snippets error:", err);
      set({ error: err.message, loading: false });
      return { success: false, message: err.message };
    }
  },
}));
