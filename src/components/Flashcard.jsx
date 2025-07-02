import { useState } from "react";

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      onClick={() => setShowAnswer(!showAnswer)}
      className="cursor-pointer mb-3 p-4 border rounded shadow-sm bg-light"
      style={{
        transition: "all 0.3s ease",
        userSelect: "none",
        backgroundColor: showAnswer ? "#e6ffe6" : "#fff",
      }}
    >
      <p><strong>Pregunta:</strong> {question}</p>
      {showAnswer && <p><strong>Respuesta:</strong> {answer}</p>}
      <small className="text-muted">
        {showAnswer ? "Haz clic para ocultar la respuesta" : "Haz clic para ver la respuesta"}
      </small>
    </div>
  );
}

export default Flashcard;
