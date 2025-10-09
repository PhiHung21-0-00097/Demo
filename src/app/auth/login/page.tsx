"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const router = useRouter();
  const { setAccessToken, setUser, setLoading, setError, loading, error } =
    useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // ✅ Lưu accessToken vào localStorage
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ Lưu vào Zustand
      setAccessToken(data.accessToken);
      setUser(data.user);

      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 rounded text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded"
          >
            {loading ? <Spinner className="w-6 h-6 mx-auto" /> : "Login"}
          </button>
        </form>

        {/* 👇 Nút chuyển sang đăng ký */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Don&apos;t have an account yet ?{" "}
          <a
            href="/auth/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
