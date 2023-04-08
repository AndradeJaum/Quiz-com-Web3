import { Inter } from "next/font/google";
import { questions } from "./questions";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(): JSX.Element {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedOption(option);
  };

  function handleNextQuestion(questionIndex: number, optionIndex: number) {
    const currentQuestion = questions[questionIndex];
    const correctAnswerIndex: number = currentQuestion.correctIndex;
    // Lógica para verificar se a resposta está correta e fazer a transição para a próxima pergunta
    if (optionIndex === correctAnswerIndex) {
      console.log("correto");
      // Lógica para a resposta correta
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Lógica para a resposta incorreta
      console.log("false");
      setQuizStarted(false);
    }
  }

  function handleStartQuiz(): void {
    setQuizStarted(true);
  }

  return (
    <main className="bg-purpleDark w-screen min-h-screen">
      <header className="bg-purple w-full p-8 border-b border-purpleHover">
        <nav className="flex gap-4 list-none justify-center">
          <li className="text-lg font-semibold hover:border-b hover:border-b-purpleHover">
            LINKEDIN
          </li>
          <li className="text-lg font-semibold hover:border-b hover:border-b-purpleHover">
            REPOSITÓRIO
          </li>
        </nav>
      </header>
      <section className="my-12">
        <div className="my-8 bg-purple w-1/2 p-8 rounded-md mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">QUIZ DO MILHÃO</h1>
            <p className="text-lg mb-4">
              Responda todas as perguntas corretamente para ganhar um token
            </p>
            <button
              className="border-2 border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded"
              onClick={handleStartQuiz}
            >
              START
            </button>
          </div>
          {quizStarted == true ? (
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold mb-4">Perguntas</h2>
              {currentQuestionIndex < questions.length ? (
                <>
                  <p className="text-lg mb-4">
                    {questions[currentQuestionIndex].question}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <li
                          key={index}
                          className={`border border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded ${
                            selectedOption === option
                              ? "bg-purpleHover text-purple"
                              : ""
                          }`}
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </li>
                      )
                    )}
                  </ul>
                  <button
                    className={`border-2 border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded mt-4 ${
                      selectedOption !== null
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      handleNextQuestion(
                        currentQuestionIndex,
                        questions[currentQuestionIndex].options.indexOf(
                          selectedOption
                        )
                      )
                    }
                    disabled={!selectedOption === null}
                  >
                    PRÓXIMA PERGUNTA
                  </button>
                </>
              ) : (
                <p className="text-lg mb-4">Parabéns! Você concluiu o quiz.</p>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </main>
  );
}
