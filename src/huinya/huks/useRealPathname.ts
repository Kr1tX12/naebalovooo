"use client";
// изаем долбаёбский язык потому что по-другому не работает почему-то

import { usePathname } from "next/navigation";

export const useRealPathname = () => {
  return usePathname();
};
