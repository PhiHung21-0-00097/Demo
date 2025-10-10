/** @type {import('next-intl').NextIntlConfig} */
const nextIntlConfig = {
  locales: ["vi", "en"], // danh sách ngôn ngữ
  defaultLocale: "vi", // mặc định /vi
  fallbackLng: "vi", // fallback nếu file json thiếu key
};

export default nextIntlConfig;
