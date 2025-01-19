import React, { useState } from "react";

function Happiness() {
  // Array of questions
  const questions = [
    { id: 1, text: "How are you feeling now?" },
    { id: 2, text: "What good deeds have you completed today?" },
    { id: 3, text: "What activities did you enjoy today?" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0); // Index of the current question
  const [score, setScore] = useState(0); // Total score
  const [responses, setResponses] = useState([]); // Track user responses
  const [answer, setAnswer] = useState(""); // User's current answer

  const handleNext = () => {
    if (!answer.trim()) {
      alert("Please provide an answer before proceeding.");
      return;
    }

    // Calculate score dynamically based on the user's answer
    let calculatedScore = evaluateAnswer(answer);
    setScore(score + calculatedScore);

    // Save the response
    setResponses([
      ...responses,
      { question: questions[currentQuestion].text, answer, calculatedScore },
    ]);

    // Move to the next question or end
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer(""); // Clear input for the next question
    } else {
      alert(`Your happiness score is ${score + calculatedScore}!`);
    }
  };

  // Function to evaluate the score dynamically
  const evaluateAnswer = (response) => {
    const positiveWords = ["great", "good", "happy", "awesome", "productive"];
    const negativeWords = ["bad", "sad", "nothing", "lazy"];

    let responseScore = 0;

    // Check for positive keywords
    positiveWords.forEach((word) => {
      if (response.toLowerCase().includes(word)) responseScore += 10;
    });

    // Check for negative keywords
    negativeWords.forEach((word) => {
      if (response.toLowerCase().includes(word)) responseScore -= 5;
    });

    // Additional scoring based on length (encouraging detailed answers)
    responseScore += Math.min(response.length, 20); // Max 20 points for length

    return Math.max(responseScore, 0); // Ensure no negative scores
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "black",
        color: "yellow",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "yellow", marginBottom: "20px" }}>Happiness Evaluation</h2>

      {currentQuestion < questions.length ? (
        <div>
          <h3 style={{ color: "yellow" }}>{questions[currentQuestion].text}</h3>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "80%",
              height: "100px",
              borderRadius: "5px",
              border: "1px solid yellow",
              backgroundColor: "black",
              color: "yellow",
            }}
          />
          <br />
          <button
            onClick={handleNext}
            style={{
              marginTop: "20px",
              backgroundColor: "yellow",
              color: "black",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: "yellow" }}>Thank you for participating!</h3>
          <p>Your total happiness score: {score}</p>
          <p>Responses:</p>
          <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
            {responses.map((response, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>{response.question}</strong>: {response.answer} (Score: {response.calculatedScore})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Happiness;


