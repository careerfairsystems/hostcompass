"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../navigation";

export default function NotFound(): JSX.Element {
	const t = useTranslations();

	return (
		<div className="min-h-screen bg-arkad-gradient-subtle flex items-center justify-center px-4">
			<div className="text-center">
				<div className="font-arkad-condensed text-2xl font-bold text-foreground tracking-wider mb-4">
					ARKAD
				</div>
				<h1 className="text-4xl font-bold text-center bg-arkad-gradient bg-clip-text text-transparent mb-4">
					404
				</h1>
				<p className="text-lg text-muted-foreground mb-8">Page not found</p>
				<Link
					href="/"
					className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-all duration-300"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}
