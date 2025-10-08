// src/types/api-response.ts

/**
 * Cấu trúc chuẩn cho mọi phản hồi từ API
 * Giúp tái sử dụng trong toàn dự án (FE & store)
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
