export interface QuizQuestion {
	id: number;
	question: string;
	leftStatement: string;
	rightStatement: string;
}

export const quizQuestions: QuizQuestion[] = [
	{
		id: 1,
		question: "Grupper",
		leftStatement: "Jag gillar att arbeta i mindre grupper",
		rightStatement: "Jag gillar att arbeta i stora grupper",
	},
	{
		id: 2,
		question: "Företagskontakt",
		leftStatement: "Jag är inte intresserad av att ha kontakt med företag",
		rightStatement: "Jag är intresserad av att ha kontakt med företag",
	},
	{
		id: 3,
		question: "Servicemindset",
		leftStatement: "Jag önskar att inte behöva vara service minded",
		rightStatement: "Jag älskar att vara serviceminded",
	},
	{
		id: 4,
		question: "Struktur",
		leftStatement:
			"Jag tycker det är bekvämt när någon säger till mig vad jag ska göra",
		rightStatement: "Jag gillar att ta iniativ",
	},
];
