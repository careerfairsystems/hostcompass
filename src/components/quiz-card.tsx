import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const _RATING_MIN = 1;
const _RATING_MAX = 5;
const RATING_SCALE_VALUES = [1, 2, 3, 4, 5] as const;

type QuizCardProps = {
	question: string;
	leftStatement: string;
	rightStatement: string;
	selectedValue: number | null;
	onSelect: (value: number) => void;
	onNext: () => void;
	canProceed: boolean;
};

export const QuizCard = ({
	question,
	leftStatement,
	rightStatement,
	selectedValue,
	onSelect,
	onNext,
	canProceed,
}: QuizCardProps) => {
	const t = useTranslations();
	return (
		<Card className="mx-auto w-full max-w-2xl animate-fade-in border-0 bg-card shadow-arkad">
			<CardContent className="p-8">
				<div className="space-y-8">
					<h2 className="text-center font-arkad font-semibold text-2xl text-foreground">
						{question}
					</h2>

					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<span className="flex-1 text-left font-medium text-muted-foreground text-sm">
								{leftStatement}
							</span>
							<span className="flex-1 text-right font-medium text-muted-foreground text-sm">
								{rightStatement}
							</span>
						</div>

						<div className="flex items-center justify-between space-x-4">
							{RATING_SCALE_VALUES.map((value) => (
								<button
									type="button"
									key={value}
									onClick={() => onSelect(value)}
									className={cn(
										"h-12 w-12 rounded-full border-2 font-medium transition-all duration-200",
										"hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
										selectedValue === value
											? "border-primary bg-primary text-primary-foreground shadow-arkad-glow"
											: "border-border bg-secondary text-foreground hover:border-primary",
									)}
								>
									{value}
								</button>
							))}
						</div>
					</div>

					<div className="flex justify-center pt-4">
						<Button
							onClick={onNext}
							disabled={!canProceed}
							className={cn(
								"rounded-lg bg-arkad-gradient px-8 py-2 font-arkad font-semibold text-primary-foreground",
								"transition-all duration-300 hover:shadow-arkad-glow",
								"disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none",
							)}
						>
							{t("quiz.next")}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
