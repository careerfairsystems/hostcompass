"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Link } from "../../../navigation";

export default function HomePage(): JSX.Element {
	const t = useTranslations();

	return (
		<div className="min-h-screen bg-arkad-gradient-subtle">
			{/* Hero Section */}
			<div className="min-h-screen flex flex-col items-center justify-center px-4">
				<div className="text-center max-w-2xl mx-auto animate-fade-in">
					{/* ARKAD Logo */}
					<div className="font-arkad-condensed text-2xl font-bold text-foreground tracking-wider mb-12">
						ARKAD
					</div>

					{/* Compass Icon and Title */}
					<div className="mb-16">
						<div className="relative mb-6">
							<img src="/banner.png" alt={`${t("landing.title")} Banner`} />
						</div>
						<h1 className="text-6xl font-bold text-center mb-2">
							<span className="bg-arkad-gradient bg-clip-text text-transparent">
								{t("landing.title")}
							</span>
						</h1>
					</div>

					{/* Language Selection */}
					<div className="mb-16">
						<h2 className="text-2xl font-medium text-foreground mb-8">
							{t("landing.languagePrompt")}
						</h2>

						<LocaleSwitcher />
					</div>

					{/* Scroll indicator */}
					<div className="animate-pulse">
						<svg
							className="w-6 h-6 mx-auto text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
				<div className="text-center max-w-4xl mx-auto animate-fade-in">
					<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
						{t("landing.mainHeading")}
					</h2>

					<div className="space-y-6 text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
						<p>{t("landing.description1")}</p>
						<p>{t("landing.description2")}</p>
						<p>{t("landing.description3")}</p>
						<p className="font-medium">{t("landing.description4")}</p>
					</div>

					<Link href="/quiz">
						<Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl font-medium rounded-full mb-16 transition-all duration-300 shadow-arkad-shadow hover:shadow-arkad-glow hover-scale">
							{t("landing.readMore")}
						</Button>
					</Link>

					{/* Team Photo */}
					<div className="mb-16 hover-scale">
						<img
							src="/lovable-uploads/4f55f2f9-8a83-44ce-afe8-946335353240.png"
							alt="ARKAD Team Photo"
							className="rounded-lg shadow-2xl max-w-full h-auto mx-auto"
						/>
					</div>
				</div>

				{/* Footer Section */}
				<footer className="w-full max-w-6xl mx-auto px-4 py-12 border-t border-border">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
						<div>
							<h3 className="text-primary font-semibold mb-4">
								{t("footer.when")}
							</h3>
							<div className="space-y-2 text-muted-foreground">
								<p>{t("footer.dates")}</p>
								<p>{t("footer.tuesday")}</p>
								<p>{t("footer.wednesday")}</p>
							</div>
						</div>

						<div>
							<h3 className="text-primary font-semibold mb-4">
								{t("footer.social")}
							</h3>
							<div className="space-y-2">
								<a
									href="#"
									className="block text-primary hover:text-primary/80 story-link"
								>
									Facebook
								</a>
								<a
									href="#"
									className="block text-primary hover:text-primary/80 story-link"
								>
									Instagram
								</a>
								<a
									href="#"
									className="block text-primary hover:text-primary/80 story-link"
								>
									LinkedIn
								</a>
							</div>
						</div>

						<div>
							<h3 className="text-primary font-semibold mb-4">
								{t("footer.app")}
							</h3>
							<div className="space-y-2 text-muted-foreground">
								<p>{t("footer.contact")}</p>
							</div>
						</div>

						<div>
							<h3 className="text-primary font-semibold mb-4">
								{t("footer.fairTitle")}
							</h3>
							<div className="space-y-2 text-muted-foreground">
								<p>{t("footer.address1")}</p>
								<p>{t("footer.address2")}</p>
								<p>{t("footer.address3")}</p>
								<p>arkad@tlth.se</p>
								<p>{t("footer.phone")}</p>
								<p>{t("footer.phoneHours")}</p>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
