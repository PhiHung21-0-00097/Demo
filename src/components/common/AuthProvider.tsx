"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "react-toastify";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, initAuth, isLoggedOut, clearLogoutFlag } =
    useAuthStore();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    initAuth();
    setTimeout(() => setIsChecking(false), 100);
  }, [initAuth]);

  // 🔹 Logout thủ công: chạy ngay khi isLoggedOut = true
  useEffect(() => {
    if (!isChecking && isLoggedOut) {
      toast.success("Đăng xuất thành công!");
      clearLogoutFlag(); // reset flag
      if (pathname !== "/auth/login") router.replace("/auth/login");
    }
  }, [isChecking, isLoggedOut, clearLogoutFlag, router, pathname]);

  // 🔹 Token hết hạn: chỉ chạy khi accessToken = null và không phải logout thủ công
  useEffect(() => {
    console.log("isLoggedOut", isLoggedOut);
    if (!isChecking && !accessToken && !isLoggedOut) {
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      if (pathname !== "/auth/login") router.replace("/auth/login");
    }
  }, [isChecking, accessToken, isLoggedOut, router, pathname]);

  if (isChecking)
    return <p className="text-center mt-10">Đang kiểm tra đăng nhập...</p>;

  return <>{children}</>;
}
