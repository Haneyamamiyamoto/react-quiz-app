import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";
type Props = {
  question: {text:string};
  
  answers : string[];
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC <Props> = ({question,answers,callBack,userAnswer,questionNr,totalQuestions}) => {
 return(
 <Wrapper>
  <p className="number">
    Question: {questionNr} / {totalQuestions}
  </p>
  <p dangerouslySetInnerHTML={{__html: question.text}}/>

  <div>
    {answers.map(answers => (
      <ButtonWrapper 
      correct= {userAnswer?.correctAnswer === answers} 
      key={answers}
      userClicked={userAnswer?.answer === answers}>
        <button disabled={!!userAnswer} value={answers} onClick={callBack}>
          <span dangerouslySetInnerHTML={{__html: answers}} />
        </button>
      </ButtonWrapper>
    ))}
  </div>
 </Wrapper>
 )
}