"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LocaleSwitcher(): JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string): void => {
    // Replace the current locale in the pathname
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded ${
          locale === "en"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("sv")}
        className={`px-2 py-1 rounded ${
          locale === "sv"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        SV
      </button>
    </div>
  );
}