import { promises } from "dns";
import { shuffleArray } from "./utils";
export type Question = {
  category: string;
  correctAnswer: string;
  difficulty: string;
  incorrectAnswers: string[];
  question: {text:string};
  text: string;
  type: string;


}

export type QuestionState = Question & {answers: string[]}

export enum Difficulty{
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

 export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://the-trivia-api.com/v2/questions?amount=${amount}&difficulty=${Difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
 
  return data.map((question: Question)=>({
    ...question,
    answers: shuffleArray([...question.incorrectAnswers, question.correctAnswer]),
  }))
 }