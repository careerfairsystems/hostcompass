"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "../../../navigation";
import Image from "next/image";

export default function HomePage(): JSX.Element {
	const t = useTranslations();

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<div className="flex min-h-screen flex-col items-center justify-center px-4">
				<div className="mx-auto max-w-2xl animate-fade-in text-center">
					{/* Compass Icon and Title */}
					<div className="relative mb-8">
						<Image 
							src="/banner.png" 
							alt={`${t("landing.title")} Banner`} 
							width={800} 
							height={400}
							priority
						/>
					</div>

					{/* Language Selection */}
					<div className="mb-16">
						<Link href="/quiz">
							<Button
								className="hover-scale shadow-arkad-shadow transition-all duration-300 hover:shadow-arkad-glow"
								size="lg"
							>
								{t("landing.startQuiz")}
							</Button>
						</Link>
					</div>

					{/* Scroll indicator */}
					<div className="animate-pulse">
						<svg
							className="mx-auto h-6 w-6 text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Scroll down indicator</title>
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
			<div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
				<div className="mx-auto max-w-4xl animate-fade-in text-center">
					<h2 className="mb-8 font-bold text-4xl text-foreground md:text-5xl">
						{t("landing.mainHeading")}
					</h2>

					<div className="mx-auto mb-12 max-w-2xl space-y-6 text-lg text-muted-foreground">
						<p>{t("landing.description1")}</p>
						<p>{t("landing.description2")}</p>
						<p>{t("landing.description3")}</p>
						<p className="font-medium">{t("landing.description4")}</p>
					</div>

					<Link href="https://www.arkadtlth.se/host">
						<Button className="hover-scale mb-12 shadow-arkad-shadow transition-all duration-300 hover:shadow-arkad-glow">
							{t("landing.readMore")}
						</Button>
					</Link>

					{/* Team Photo */}
					<div className="hover-scale mb-16">
						<Image
							src="/group-photo.jpg"
							alt={t("landing.teamPhotoAlt")}
							width={800}
							height={600}
							className="mx-auto h-auto max-w-full rounded-lg shadow-2xl"
						/>
					</div>
				</div>

				{/* Footer Section */}
				<footer className="mx-auto w-full max-w-6xl border-border border-t px-4 py-12">
					<div className="grid grid-cols-1 gap-8 text-sm md:grid-cols-4">
						<div>
							<h3 className="mb-4 font-semibold text-primary">
								{t("footer.when")}
							</h3>
							<div className="space-y-2 text-muted-foreground">
								<p>{t("footer.dates")}</p>
								<p>{t("footer.tuesday")}</p>
								<p>{t("footer.wednesday")}</p>
							</div>
						</div>

						<div>
							<h3 className="mb-4 font-semibold text-primary">
								{t("footer.social")}
							</h3>
							<div className="space-y-2">
								<a
									href="https://facebook.com/arkadtlth"
									className="story-link block text-primary hover:text-primary/80"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("footer.facebook")}
								</a>
								<a
									href="https://instagram.com/arkadtlth"
									className="story-link block text-primary hover:text-primary/80"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("footer.instagram")}
								</a>
								<a
									href="https://linkedin.com/company/arkadtlth"
									className="story-link block text-primary hover:text-primary/80"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("footer.linkedin")}
								</a>
							</div>
						</div>

						<div>
							<h3 className="mb-4 font-semibold text-primary">
								{t("footer.app")}
							</h3>
							<div className="space-y-2 text-muted-foreground">
								<p>{t("footer.contact")}</p>
							</div>
						</div>

						<div>
							<h3 className="mb-4 font-semibold text-primary">
								{t("footer.fairTitle")}
							</h3>
							<div className="space-y-2 text-muted-foreground">
								<p>{t("footer.address1")}</p>
								<p>{t("footer.address2")}</p>
								<p>{t("footer.address3")}</p>
								<p>{t("footer.email")}</p>
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
