import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response";
import { create } from "zustand";

export interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  tag: string;
  author?: { name: string };
  createdAt?: string;
}

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

      // axios trả về AxiosResponse<ApiResponse<Snippet[]>>
      const res: any = await api.get<ApiResponse<Snippet[]>>("/snippets");

      if (!res.success) {
        throw new Error(res.message || "Fetch failed");
      }

      // Cập nhật store
      set({
        snippets: res.data || [],
        loading: false,
        error: null,
      });

      return res;
    } catch (err: any) {
      console.error("❌ Fetch snippets error:", err);
      set({ error: err.message, loading: false });
      return { success: false, message: err.message };
    }
  },
}));
