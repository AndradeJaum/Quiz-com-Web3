import { Inter } from "next/font/google";
import { questions } from "./questions";
import { useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home(): JSX.Element {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string): void => {
    setSelectedOption(option);
  };

  function handleValidateAnswer(questionIndex: number, optionIndex: number) {
    const currentQuestion = questions[questionIndex];
    const correctAnswerIndex: number = currentQuestion.correctIndex;

    if (optionIndex === correctAnswerIndex) {
      setIsAnswerCorrect(true);
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsAnswerCorrect(false);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
    }
  }

  function handleStartQuiz(): void {
    setQuizStarted(true);
    setIsAnswerCorrect(null);
  }

  return (
    <main className="bg-purpleDark w-screen min-h-screen">
      <header className="bg-purple w-full p-8 border-b border-purpleHover">
        <nav className="flex gap-4 list-none justify-center">
          <li className="text-lg font-semibold hover:border-b hover:border-b-purpleHover">
            <Link href="/">HOME</Link>
          </li>
          <li className="text-lg font-semibold hover:border-b hover:border-b-purpleHover">
            <Link href="https://www.linkedin.com/in/joao-vitorandrade/">
              LINKEDIN
            </Link>
          </li>
          <li className="text-lg font-semibold hover:border-b hover:border-b-purpleHover">
            <Link href="https://github.com/AndradeJaum/Quiz-com-Web3">
              REPOSITÓRIO
            </Link>
          </li>
        </nav>
      </header>
      <section className="my-12">
        <div className="my-8 bg-purple w-1/2 p-8 rounded-md mx-auto">
          {!quizStarted ? (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-4">QUIZ DO MILHÃO</h1>
              <p className="text-lg mb-4">
                Responda todas as perguntas corretamente para ganhar um token
              </p>
              {isAnswerCorrect === false && (
                <p className="text-red-500 mb-4">
                  Resposta incorreta. Tente novamente.
                </p>
              )}
              <button
                className="border-2 border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded"
                onClick={handleStartQuiz}
              >
                START
              </button>
            </div>
          ) : (
            <div className="flex flex-col ">
              <p className="mb-4"></p>
              <h2 className="text-2xl font-bold mb-4">Perguntas</h2>

              {currentQuestionIndex < questions.length ? (
                <>
                  <p className="mb-4">
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
                      selectedOption ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      handleValidateAnswer(
                        currentQuestionIndex,
                        questions[currentQuestionIndex].options.indexOf(
                          selectedOption
                        )
                      );
                      setIsAnswerCorrect(null);
                    }}
                    disabled={!selectedOption}
                  >
                    PRÓXIMA PERGUNTA
                  </button>
                </>
              ) : (
                <p className="text-lg mb-4">Parabéns! Você concluiu o quiz.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
