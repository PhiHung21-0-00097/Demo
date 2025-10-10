"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

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
    <div className="h-screen bg-[#abb8c3] pt-10 px-2 xs:px-0">
      <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

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

          {/* 👇 Nút chuyển sang đăng ký */}
          <p className="text-center text-sm mt-4 text-white ">
            Don&apos;t have an account yet ?{" "}
            <a
              href="/auth/register"
              className="text-green-500 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded cursor-pointer"
          >
            {loading ? <Spinner className="w-6 h-6 mx-auto" /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
