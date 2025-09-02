export type QuizQuestion = {
	id: number;
	questionKey: string;
	leftStatementKey: string;
	rightStatementKey: string;
};

export const quizQuestions: QuizQuestion[] = [
	{
		id: 1,
		questionKey: "questions.groups.title",
		leftStatementKey: "questions.groups.left",
		rightStatementKey: "questions.groups.right",
	},
	{
		id: 2,
		questionKey: "questions.companyContact.title",
		leftStatementKey: "questions.companyContact.left",
		rightStatementKey: "questions.companyContact.right",
	},
	{
		id: 3,
		questionKey: "questions.serviceMindset.title",
		leftStatementKey: "questions.serviceMindset.left",
		rightStatementKey: "questions.serviceMindset.right",
	},
	{
		id: 4,
		questionKey: "questions.structure.title",
		leftStatementKey: "questions.structure.left",
		rightStatementKey: "questions.structure.right",
	},
];
