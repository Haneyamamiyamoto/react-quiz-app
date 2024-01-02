import React, {useState} from 'react';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  questions: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTAL_QUESTIONS = 10;
const App = () => {

 

 const[loading, setLoading] = useState(false);
 const[questions, setQuestions] = useState<QuestionState[]>([]);
 const[number,setNumber] = useState(0);
 const[userAnswer,setUserAnswer] = useState<AnswerObject[]>([]);
 const[score, setScore] = useState(0);
 const[gameOver, setGameOver] = useState(true);
 console.log(questions);

  const startQuiz = async () => {
   setLoading(true);
   setGameOver(false);

   const newQuestions = await fetchQuizQuestions(
    TOTAL_QUESTIONS,
    Difficulty.EASY
   );
   setQuestions(newQuestions);
   setScore(0);
   setUserAnswer([]);
   setNumber(0);
   setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!gameOver){
   const answer = e.currentTarget.value;
   const correct = questions[number].correctAnswer === answer;
   if (correct) setScore(prev=> prev + 1 );
   
   const answerObject: AnswerObject = {
    questions: questions[number].question.text, 
    answer,
    correct,
    correctAnswer: questions[number].correctAnswer,
  };
  
  setUserAnswer((prev) => [...prev, answerObject]);
  
  }
  };

  const nextQuestion = () => {
  const nextQuestion = number + 1;
  if(nextQuestion === TOTAL_QUESTIONS) {
    setGameOver(true)
  }
  else{
    setNumber(nextQuestion);
  }
  }
  return (<>
  <GlobalStyle />
    <Wrapper>
      <h1>React quiz</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startQuiz}>
        start
      </button>
      ): null}
      
     {!gameOver ? <p className='score'>Score: {score}</p>: null}
      {loading && <p>Loading questions</p>}
      {!loading && !gameOver && (
      <QuestionCard 
      questionNr={number + 1} 
      totalQuestions={TOTAL_QUESTIONS} 
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswer? userAnswer[number]: undefined}
      callBack={checkAnswer} 

      
      />)}
      {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1?(
        <button className='next' onClick={nextQuestion}>next</button>
      ): null}
    
    </Wrapper>
    </>
  );
}

export default App;
