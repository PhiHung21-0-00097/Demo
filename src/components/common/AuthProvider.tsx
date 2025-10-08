"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "react-toastify";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken, initAuth, isLoggedOut, clearLogoutFlag } =
    useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    initAuth();
    setTimeout(() => setIsChecking(false), 300);
  }, [initAuth]);

  // Check logout thủ công
  useEffect(() => {
    if (!isChecking && isLoggedOut) {
      toast.success("Đăng xuất thành công!");
      clearLogoutFlag();
      setHasNotified(true); // để tránh toast hết hạn token ngay sau đó
      router.replace("/auth/login");
    }
  }, [isChecking, isLoggedOut, clearLogoutFlag, router]);

  // Check accessToken hết hạn (chỉ khi không phải logout)
  useEffect(() => {
    if (!isChecking && !accessToken && !hasNotified && !isLoggedOut) {
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      setHasNotified(true);
      router.replace("/auth/login");
    }
  }, [isChecking, accessToken, hasNotified, isLoggedOut, router]);

  if (isChecking)
    return <p className="text-center mt-10">Đang kiểm tra đăng nhập...</p>;

  return <>{children}</>;
}
