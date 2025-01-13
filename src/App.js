import React, { useState, useEffect } from 'react';
import './App.css';
import questionData from './questions.json';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  // Randomly pick a question when the component mounts
  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionData.length);
    setQuestion(questionData[randomIndex].question);
    setAnswer('');
    setIsCorrect(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = questionData.find(q => q.question === question);
    
    if (answer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="App">
      <div className="question-card">
        <h2>Question:</h2>
        <p>{question}</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Type your answer..." 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
          />
          <button type="submit">Submit</button>
        </form>
        
        {isCorrect !== null && (
          <p>{isCorrect ? "Correct!" : "Wrong, try again!"}</p>
        )}
      </div>
      
      <button onClick={getRandomQuestion}>Next Question</button>
    </div>
  );
}

export default App;
