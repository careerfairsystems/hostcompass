import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import LocaleSwitcher from "@/components/locale-selector";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html className="h-full" lang={locale}>
			<body className={"flex h-full flex-col"}>
				<NextIntlClientProvider>
					<div className="fixed top-4 right-4 z-10">
						<LocaleSwitcher />
					</div>

					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}
