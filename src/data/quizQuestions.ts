export interface QuizQuestion {
  id: number;
  question: string;
  leftStatement: string;
  rightStatement: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hur föredrar du att arbeta?",
    leftStatement: "Jag gillar att arbeta i mindre grupper",
    rightStatement: "Jag gillar att arbeta i stora grupper"
  },
  {
    id: 2,
    question: "När du fattar beslut...",
    leftStatement: "Jag tar tid att tänka igenom allt noggrant",
    rightStatement: "Jag fattar beslut snabbt baserat på intuition"
  },
  {
    id: 3,
    question: "På en fest eller sammankomst...",
    leftStatement: "Jag föredrar djupa samtal med få personer",
    rightStatement: "Jag älskar att mingla och träffa många"
  },
  {
    id: 4,
    question: "När du lär dig något nytt...",
    leftStatement: "Jag föredrar att studera själv eller i lugn miljö",
    rightStatement: "Jag lär mig bäst genom diskussioner med andra"
  },
  {
    id: 5,
    question: "I problemlösning...",
    leftStatement: "Jag föredrar att analysera och reflektera",
    rightStatement: "Jag brainstormar gärna med teamet"
  }
];