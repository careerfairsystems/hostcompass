import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { routing } from "@/i18n/routing";

type SupportedLocales = (typeof routing.locales)[number];
type QuizResultsProps = {
	answers: number[];
	onRestart: () => void;
};

type Role = {
	name: {
		en: string;
		sv: string;
	};
	recommendations: Array<{
		title: string;
		description: string;
	}>;
};

export const QuizResults = ({ answers, onRestart }: QuizResultsProps) => {
	const t = useTranslations();
	const currentLocale = useLocale() as SupportedLocales;
	// Calculate personality type based on answers
	const calculateRole = (userAnswers: number[]): Role => {
		// CSV data with role answers for 4 questions: Grupper, Företagskontakt, Servicemindset, Struktur
		const roleData = [
			{
				name: { sv: "Eventvärd", en: "Event host" },
				answers: [2, 4, 4, 2],
				description: {
					sv: "Som Eventvärd kommer du tillsammans med dina medvärdar leverera event veckan innan och under ARKAD. Du kommer bland annat förbereda lokalerna inför eventen, välkomna gäster och se till att både företag och besökare blir nöjda med eventet. Denna roll passar dig som är serviceminded och som vill ha kontakt med företagen såväl som besökarna!",
					en: "As an Event Host, you will work together with your fellow hosts to deliver events the week before and during ARKAD. You will prepare venues for events, welcome guests, and ensure that both companies and visitors are satisfied with the event. This role suits you if you are service-minded and want to have contact with both companies and visitors!"
				}
			},
			{
				name: { sv: "Mediavärd", en: "Media host" },
				answers: [1, 4, 1, 4],
				description: {
					sv: "Som mediavärd kommer du främst att vara delaktig i att dokumentera ARKADs mässa och bankett. Rollen passar dig som har ett intresse för foto och/eller film, som gillar att mingla bland företag och studenter och som tycker om självständigt arbete där du får utrymme att ta egna kreativa initiativ.",
					en: "As a Media Host, you will primarily be involved in documenting ARKAD's fair and banquet. This role suits you if you have an interest in photography and/or film, enjoy mingling among companies and students, and like independent work where you have room for your own creative initiatives."
				}
			},
			{
				name: { sv: "Interior Design Värd", en: "Interior Design Host" },
				answers: [3, 1, 1, 3],
				description: {
					sv: "Är du intresserad av att dekorera och tycker det är kul med inredningsdesign? Som Interior Design Värd har du i uppgift att hjälpa till att få mässan att vara estetiskt tilltalande samtidigt som den ger ett professionellt intryck.",
					en: "Are you interested in decorating and think interior design is fun? As an Interior Design Host, your task is to help make the fair aesthetically appealing while giving a professional impression."
				}
			},
			{
				name: { sv: "Logistikvärd", en: "Logistics host" },
				answers: [3, 3, 5, 3],
				description: {
					sv: "Som logistikvärd kommer du tillsammans med logistikgruppen se till att allt funkar som det ska under mässdagarna. Ni står för samordning, organisation och transport av företagens gods och kommer hjälpa till att ställa i ordning allt på mässområdet.",
					en: "As a Logistics Host, you will work together with the logistics team to ensure everything functions as it should during the fair days. You are responsible for coordination, organization, and transportation of companies' goods and will help set up everything at the fair area."
				}
			},
			{
				name: { sv: "Garderobsvärd", en: "Wardrobe host" },
				answers: [1, 4, 5, 2],
				description: {
					sv: "Som garderobsvärd håller du, tillsammans med andra garderobsvärdar, koll på en av våra garderober där företagsrepresentanter kan lämna och hämta sina ytterkläder. Din huvudsakliga uppgift är hantering av garderobsbiljetter.",
					en: "As a Wardrobe Host, you will, together with other wardrobe hosts, keep track of one of our wardrobes where company representatives can leave and pick up their outerwear. Your main task is handling wardrobe tickets."
				}
			},
			{
				name: { sv: "Info Desk Värd", en: "Info Desk Host" },
				answers: [2, 3, 5, 3],
				description: {
					sv: "Är du hjälpsam och har lätt att hålla koll på information? Som Info Desk Host står du i en av informationsdiskarna i entrén till våra mässlokaler. Din främsta uppgift är att se till så företagsrepresentanter och studenter får svar på alla frågor som uppstår.",
					en: "Are you helpful and good at keeping track of information? As an Info Desk Host, you will stand at one of the information desks in the entrance to our fair venues. Your main task is to ensure that company representatives and students get answers to all questions that arise."
				}
			},
			{
				name: { sv: "Bankett värd", en: "Banquet host" },
				answers: [5, 1, 2, 1],
				description: {
					sv: "Som Bankett värd kommer du hjälpa till med att vika servetter, fixa och dekorera lokalen inför sittningen under bankettdagen och sen hjälpa till att städa efter hela mässan är över.",
					en: "As a Banquet Host, you will help fold napkins, fix and decorate the venue for the dinner during the banquet day, and then help clean up after the entire fair is over."
				}
			},
			{
				name: { sv: "Interior", en: "Interior" },
				answers: [2, 1, 1, 3],
				description: {
					sv: "Gillar du inredningsdesign och att dekorera? Sök Interior Host! Som Interior Host hjälper du dina koordinatorer med att dekorera självaste mässan.",
					en: "Do you like interior design and decorating? Apply for Interior Host! As an Interior Host, you help your coordinators decorate the fair itself."
				}
			},
			{
				name: { sv: "Lunchvärd", en: "Lunch host" },
				answers: [5, 3, 5, 2],
				description: {
					sv: "Som lunchvärd kommer du att välkomna och servera lunch till företagsrepresentanter och funktionärer. Ditt ansvar är att möta lungästerna i dörren, lägga upp mat på tallrikar, packa take-away lådor och hålla ordning i matsalen.",
					en: "As a Lunch Host, you will welcome and serve lunch to company representatives and officials. Your responsibility is to meet lunch guests at the door, plate food, pack take-away boxes, and maintain order in the dining room."
				}
			},
			{
				name: { sv: "Loungevärd", en: "Lounge host" },
				answers: [4, 4, 5, 3],
				description: {
					sv: "Gillar du att arbeta med människor och skapa en trevlig och välkomnande atmosfär? Att vara Lounge Värd innebär att du kommer att ta hand om loungerna som är tillgängliga för utställarna och de engagerade studenterna.",
					en: "Do you like working with people and creating a pleasant and welcoming atmosphere? Being a Lounge Host means you will take care of the lounges available to exhibitors and engaged students."
				}
			},
			{
				name: { sv: "Company host", en: "Company host" },
				answers: [1, 5, 5, 3],
				description: {
					sv: "Som Company Host kommer du att bli tilldelad två företag som du kommer att assistera inför och under mässan. Din huvudsakliga uppgift är att hjälpa företaget och vara dess informationskälla.",
					en: "As a Company Host, you will be assigned two companies that you will assist before and during the fair. Your main task is to help the company and be their source of information."
				}
			},
			{
				name: {
					sv: "Power Supply & Network Värd",
					en: "Power Supply & Network Host",
				},
				answers: [3, 1, 2, 4],
				description: {
					sv: "Som Power Supply & Network Host kommer du att vara en del i arbetet med allt som rör el och nätverk under mässan. Du kommer inför mässan vara delaktig i planeringen kring hur all el och nätverk skall förläggas.",
					en: "As a Power Supply & Network Host, you will be part of the work with everything related to electricity and networks during the fair. Before the fair, you will be involved in planning how all electricity and networks should be deployed."
				}
			},
		];

		// Calculate Euclidean distance between user answers and each role
		const calculateDistance = (
			currentAnswers: number[],
			roleAnswers: number[],
		): number => {
			return Math.sqrt(
				currentAnswers.reduce((sum, answer, index) => {
					return sum + (answer - roleAnswers[index]) ** 2;
				}, 0),
			);
		};

		// Find the 3 closest matching roles
		const rolesWithDistances = roleData.map((role) => ({
			...role,
			distance: calculateDistance(userAnswers, role.answers),
		}));

		const sortedRoles = rolesWithDistances.sort(
			(a, b) => a.distance - b.distance,
		);
		const top3Roles = sortedRoles.slice(0, 3);

		return {
			name: { sv: "Dina Bästa Matchningar", en: "Your Best Matches" },
			recommendations: top3Roles.map((role, _index) => ({
				title: role.name[currentLocale],
				description: role.description[currentLocale],
			})),
		};
	};
	const personalityType = calculateRole(answers);
	return (
		<div className="mx-auto w-full max-w-2xl animate-fade-in">
			<Card className="border-0 bg-card shadow-arkad">
				<CardHeader className="pb-4 text-center">
					<CardTitle className="bg-arkad-gradient bg-clip-text font-arkad font-bold text-3xl text-transparent">
						{t("quiz.topRecommendations")}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6 p-8">
					<div className="space-y-4">
						<div className="grid gap-4">
							{personalityType.recommendations.map((recommendation, index) => (
								<Card key={recommendation.title} className="border-border bg-card/50">
									<CardContent className="p-4">
										<h4 className="mb-2 font-semibold text-foreground">
											{index + 1}. {recommendation.title}
										</h4>
										<p className="text-muted-foreground text-sm">
											{recommendation.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>

					{/* <div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">
							Dina svar:
						</h3>
						<div className="grid grid-cols-5 gap-2">
							{answers.map((answer, index) => (
								<div
									key={index}
									className="flex flex-col items-center p-3 bg-card rounded-lg border"
								>
									<span className="text-xs text-muted-foreground mb-1">
										Fråga {index + 1}
									</span>
									<span className="text-lg font-semibold text-primary">
										{answer}
									</span>
								</div>
							))}
						</div>
					</div> */}

					<div className="flex justify-center pt-6">
						<Link href="/" className="mr-4">
							<Button variant="outline">{t("quiz.backToHome")}</Button>
						</Link>
						<Button
							onClick={onRestart}
							className="rounded-lg bg-arkad-gradient px-8 py-2 font-arkad font-semibold text-primary-foreground transition-all duration-300 hover:shadow-arkad-glow"
						>
							{t("quiz.retakeQuiz")}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
