"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../navigation";

export default function NotFound(): JSX.Element {
	const _t = useTranslations();

	return (
		<div className="flex min-h-screen items-center justify-center bg-arkad-gradient-subtle px-4">
			<div className="text-center">
				<div className="mb-4 font-arkad-condensed font-bold text-2xl text-foreground tracking-wider">
					ARKAD
				</div>
				<h1 className="mb-4 bg-arkad-gradient bg-clip-text text-center font-bold text-4xl text-transparent">
					404
				</h1>
				<p className="mb-8 text-lg text-muted-foreground">Page not found</p>
				<Link
					href="/"
					className="rounded-full bg-primary px-6 py-3 text-primary-foreground transition-all duration-300 hover:bg-primary/90"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}
