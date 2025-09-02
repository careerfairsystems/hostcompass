"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LocaleSwitcher(): JSX.Element {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className="flex gap-8 justify-center mt-6">
			<Link href="/quiz">
				<button className="text-xl px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors">
					Svenska
				</button>
			</Link>
			<Link href="/quiz">
				<button
					onClick={() => switchLocale("en")}
					className="text-xl px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors"
				>
					English
				</button>
			</Link>
		</div>
	);
}
