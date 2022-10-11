import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}
// const tempurl =
//   "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple";

const API_ENDPOINT = 'https://opentdb.com/api.php?'

// const url = ''

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [ waiting , setWaiting] = useState(true)
  const [ loading ,setLoading ] = useState(false)
  const [ questions , setQuestions  ]= useState([])
  const [ index , setIndex  ]= useState(0)
  const [ correct , setCorrect  ]= useState(0)
  const [ error , setError] = useState(false)
  const [ isModalOpen , setIsModalOpen  ]= useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestion = async(url)=>{
    setLoading(true);
    setWaiting(false)
 const response = await axios(url)
 console.log(response);
 if(response){
  const data = response.data.results;
 if(data.length > 0){
  setQuestions(data)
  setWaiting(false);
  setLoading(false)
  setError(false)
 }else{
  setWaiting(true);
  setError(true)
 }
 }else{
  setWaiting(true);
 }
  } 
  const nextQuestion = ()=>{
    setIndex((oldIndex)=>{
      const index = oldIndex + 1;
      if(index > questions.length - 1){
        openModal();
           return 0
      }
      else{
        return index
      }
    })
  }

  const checkAnswer = (value)=>{
    if(value){
       setCorrect((oldState)=>{
      return oldState + 1;
  })
  nextQuestion()
}
  }

  const openModal = ()=>{
    setIsModalOpen(true)
  }
  const closeModal = ()=>{
    setWaiting(false);
    setCorrect(0);
    setIsModalOpen(false)
  }
const handleChange = (e)=>{
console.log(e.target.name);
const name = e.target.name;
const value = e.target.value
setQuiz({...quiz , [name]:value})
}
 const handleSubmit = (e)=>{
e.preventDefault();
const {amount , difficulty , category }= quiz
const url =`${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`

fetchQuestion(url)

 }
  return <AppContext.Provider value={{waiting,loading, questions ,index , correct ,error , isModalOpen , nextQuestion , checkAnswer,setIsModalOpen,closeModal , handleSubmit,handleChange,quiz}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
