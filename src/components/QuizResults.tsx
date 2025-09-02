import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
interface QuizResultsProps {
	answers: number[];
	onRestart: () => void;
}

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
	// Calculate personality type based on answers
	const calculateRole = (answers: number[]): Role => {
		// CSV data with role answers for 4 questions: Grupper, Företagskontakt, Servicemindset, Struktur
		const roleData = [
			{
				name: { sv: "Eventvärd", en: "Event host" },
				answers: [2, 4, 4, 2],
				description:
					"Som Eventvärd kommer du tillsammans med dina medvärdar leverera event veckan innan och under ARKAD. Du kommer bland annat förbereda lokalerna inför eventen, välkomna gäster och se till att både företag och besökare blir nöjda med eventet. Denna roll passar dig som är serviceminded och som vill ha kontakt med företagen såväl som besökarna!",
			},
			{
				name: { sv: "Mediavärd", en: "Media host" },
				answers: [1, 4, 1, 4],
				description:
					"Som mediavärd kommer du främst att vara delaktig i att dokumentera ARKADs mässa och bankett. Rollen passar dig som har ett intresse för foto och/eller film, som gillar att mingla bland företag och studenter och som tycker om självständigt arbete där du får utrymme att ta egna kreativa initiativ.",
			},
			{
				name: { sv: "Interior Design Värd", en: "Interior Design Host" },
				answers: [3, 1, 1, 3],
				description:
					"Är du intresserad av att dekorera och tycker det är kul med inredningsdesign? Som Interior Design Värd har du i uppgift att hjälpa till att få mässan att vara estetiskt tilltalande samtidigt som den ger ett professionellt intryck.",
			},
			{
				name: { sv: "Logistikvärd", en: "Logistics host" },
				answers: [3, 3, 5, 3],
				description:
					"Som logistikvärd kommer du tillsammans med logistikgruppen se till att allt funkar som det ska under mässdagarna. Ni står för samordning, organisation och transport av företagens gods och kommer hjälpa till att ställa i ordning allt på mässområdet.",
			},
			{
				name: { sv: "Garderobsvärd", en: "Wardrobe host" },
				answers: [1, 4, 5, 2],
				description:
					"Som garderobsvärd håller du, tillsammans med andra garderobsvärdar, koll på en av våra garderober där företagsrepresentanter kan lämna och hämta sina ytterkläder. Din huvudsakliga uppgift är hantering av garderobsbiljetter.",
			},
			{
				name: { sv: "Info Desk Värd", en: "Info Desk Host" },
				answers: [2, 3, 5, 3],
				description:
					"Är du hjälpsam och har lätt att hålla koll på information? Som Info Desk Host står du i en av informationsdiskarna i entrén till våra mässlokaler. Din främsta uppgift är att se till så företagsrepresentanter och studenter får svar på alla frågor som uppstår.",
			},
			{
				name: { sv: "Bankett värd", en: "Banquet host" },
				answers: [5, 1, 2, 1],
				description:
					"Som Bankett värd kommer du hjälpa till med att vika servetter, fixa och dekorera lokalen inför sittningen under bankettdagen och sen hjälpa till att städa efter hela mässan är över.",
			},
			{
				name: { sv: "Interior", en: "Interior" },
				answers: [2, 1, 1, 3],
				description:
					"Gillar du inredningsdesign och att dekorera? Sök Interior Host! Som Interior Host hjälper du dina koordinatorer med att dekorera självaste mässan.",
			},
			{
				name: { sv: "Lunchvärd", en: "Lunch host" },
				answers: [5, 3, 5, 2],
				description:
					"Som lunchvärd kommer du att välkomna och servera lunch till företagsrepresentanter och funktionärer. Ditt ansvar är att möta lungästerna i dörren, lägga upp mat på tallrikar, packa take-away lådor och hålla ordning i matsalen.",
			},
			{
				name: { sv: "Loungevärd", en: "Lounge host" },
				answers: [4, 4, 5, 3],
				description:
					"Gillar du att arbeta med människor och skapa en trevlig och välkomnande atmosfär? Att vara Lounge Värd innebär att du kommer att ta hand om loungerna som är tillgängliga för utställarna och de engagerade studenterna.",
			},
			{
				name: { sv: "Company host", en: "Company host" },
				answers: [1, 5, 5, 3],
				description:
					"Som Company Host kommer du att bli tilldelad två företag som du kommer att assistera inför och under mässan. Din huvudsakliga uppgift är att hjälpa företaget och vara dess informationskälla.",
			},
			{
				name: {
					sv: "Power Supply & Network Värd",
					en: "Power Supply & Network Host",
				},
				answers: [3, 1, 2, 4],
				description:
					"Som Power Supply & Network Host kommer du att vara en del i arbetet med allt som rör el och nätverk under mässan. Du kommer inför mässan vara delaktig i planeringen kring hur all el och nätverk skall förläggas.",
			},
		];

		// Calculate Euclidean distance between user answers and each role
		const calculateDistance = (
			userAnswers: number[],
			roleAnswers: number[],
		): number => {
			return Math.sqrt(
				userAnswers.reduce((sum, answer, index) => {
					return sum + Math.pow(answer - roleAnswers[index], 2);
				}, 0),
			);
		};

		// Find the 3 closest matching roles
		const rolesWithDistances = roleData.map((role) => ({
			...role,
			distance: calculateDistance(answers, role.answers),
		}));

		const sortedRoles = rolesWithDistances.sort(
			(a, b) => a.distance - b.distance,
		);
		const top3Roles = sortedRoles.slice(0, 3);

		return {
			name: { sv: "Dina Bästa Matchningar", en: "Your Best Matches" },
			recommendations: top3Roles.map((role, index) => ({
				title: role.name.sv,
				description: role.description,
			})),
		};
	};
	const personalityType = calculateRole(answers);
	return (
		<div className="w-full max-w-2xl mx-auto animate-fade-in">
			<Card className="shadow-arkad border-0 bg-card">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-3xl font-bold bg-arkad-gradient bg-clip-text text-transparent font-arkad">
						{t("quiz.topRecommendations")}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6 p-8">
					<div className="space-y-4">
						<div className="grid gap-4">
							{personalityType.recommendations.map((recommendation, index) => (
								<Card key={index} className="bg-card/50 border-border">
									<CardContent className="p-4">
										<h4 className="font-semibold text-foreground mb-2">
											{index + 1}. {recommendation.title}
										</h4>
										<p className="text-sm text-muted-foreground">
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
							className="px-8 py-2 bg-arkad-gradient text-primary-foreground font-semibold rounded-lg hover:shadow-arkad-glow transition-all duration-300 font-arkad"
						>
							{t("quiz.retakeQuiz")}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
