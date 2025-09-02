"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
type SupportedLocales = (typeof routing.locales)[number];
const localeConfig: Record<SupportedLocales, { nameKey: string; flag: string }> = {
	en: {
		nameKey: "locales.english",
		flag: "🇬🇧",
	},
	sv: {
		nameKey: "locales.svenska",
		flag: "🇸🇪",
	},
} as const;

export default function LocaleSwitcher() {
	const currentLocale = useLocale() as SupportedLocales;
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations();

	const selectedConfig = localeConfig[currentLocale];

	const handleLocaleChange = (newLocale: SupportedLocales) => {
		if (newLocale !== currentLocale) {
			// Navigate to the same page in the new locale
			router.replace(pathname, { locale: newLocale });
		}
	};

	return (
		<Select onValueChange={handleLocaleChange} value={currentLocale}>
			<SelectTrigger className="w-fit">
				{selectedConfig ? (
					<div className="flex items-center gap-2">
						<span className="text-lg">{selectedConfig.flag}</span>
						<span>{t(selectedConfig.nameKey)}</span>
					</div>
				) : (
					<SelectValue placeholder={t("forms.selectOption")} />
				)}
			</SelectTrigger>
			<SelectContent>
				{routing.locales.map((locale) => {
					const config = localeConfig[locale];
					return (
						<SelectItem key={locale} value={locale}>
							<div className="flex items-center gap-2">
								<span className="text-lg">{config.flag}</span>
								<span>{t(config.nameKey)}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
