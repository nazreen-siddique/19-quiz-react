import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
  const {waiting , loading , questions ,index ,correct,nextQuestion , checkAnswer} = useGlobalContext();

  if(waiting){
   return <SetupForm/>
  }
  if(loading){
   return <Loading/>
  }
  console.log(questions);
  const {question , incorrect_answers , correct_answer } = questions[index]
let answers = [...incorrect_answers]
const tempIndex = Math.floor(Math.random()*4)

if(tempIndex===3){
  answers.push(correct_answer)
}else{
  answers.push(answers[tempIndex]);
  answers[tempIndex]=correct_answer;
}
return <main>
   <Modal/>
    <section className="quiz">
<p className="correct-answers">
 correct answer : {correct} / {questions.length}
</p>
<article className="container">
<h2 dangerouslySetInnerHTML={{__html:question}}/>
<div className="btn-container">
  {answers.map((answer , index)=>{
    return(
      <button onClick={()=>checkAnswer(correct_answer === answer)}
       key={index} className="answer-btn"   dangerouslySetInnerHTML={{__html:answer}}/>
    )
  })}
</div>

</article>
<button className="next-question" onClick={nextQuestion}>next question</button>
    </section>
  </main>
}

export default App
