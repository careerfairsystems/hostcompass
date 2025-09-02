"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { QuizCard } from "@/components/quiz-card";
import { ProgressBar } from "@/components/progress-bar";
import { QuizResults } from "@/components/quiz-results";
import { quizQuestions } from "@/data/quizQuestions";

export default function QuizPage(): JSX.Element {
	const t = useTranslations();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<number[]>([]);
	const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
	const [showResults, setShowResults] = useState(false);

	const handleAnswerSelect = (value: number): void => {
		setCurrentAnswer(value);
	};

	const handleNext = (): void => {
		if (currentAnswer === null) { return; }

		const newAnswers = [...answers, currentAnswer];
		setAnswers(newAnswers);
		setCurrentAnswer(null);

		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			setShowResults(true);
		}
	};

	const handleRestart = (): void => {
		setCurrentQuestion(0);
		setAnswers([]);
		setCurrentAnswer(null);
		setShowResults(false);
	};

	if (showResults) {
		return (
			<div className="min-h-screen bg-arkad-gradient-subtle px-4 py-12">
				<div className="container mx-auto">
					<div className="mb-8 text-center">
						<div className="mb-2 font-arkad-condensed font-bold text-2xl text-foreground tracking-wider">
							ARKAD
						</div>
						<h1 className="bg-arkad-gradient bg-clip-text text-center font-bold text-4xl text-transparent">
							{t("quiz.results")}
						</h1>
					</div>
					<QuizResults answers={answers} onRestart={handleRestart} />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-arkad-gradient-subtle px-4 py-12">
			<div className="container mx-auto">
				<div className="mb-8 text-center">
					<div className="mb-2 font-arkad-condensed font-bold text-2xl text-foreground tracking-wider">
						ARKAD
					</div>
					<h1 className="bg-arkad-gradient bg-clip-text text-center font-bold text-4xl text-transparent">
						{t("quiz.title")}
					</h1>
				</div>

				<ProgressBar
					currentStep={currentQuestion}
					totalSteps={quizQuestions.length}
				/>

				<QuizCard
					question={t(quizQuestions[currentQuestion].questionKey)}
					leftStatement={t(quizQuestions[currentQuestion].leftStatementKey)}
					rightStatement={t(quizQuestions[currentQuestion].rightStatementKey)}
					selectedValue={currentAnswer}
					onSelect={handleAnswerSelect}
					onNext={handleNext}
					canProceed={currentAnswer !== null}
				/>
			</div>
		</div>
	);
}
