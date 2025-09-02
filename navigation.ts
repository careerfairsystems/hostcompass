import { createNavigation } from "next-intl/navigation";

const locales = ["en", "sv"] as const;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales });