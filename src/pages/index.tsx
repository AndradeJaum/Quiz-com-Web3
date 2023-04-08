import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// const [currentQuestion, setCurrentQuestion] = useState(0);
// const [selectedOption, setSelectedOption] = useState(null);
// const [showResult, setShowResult] = useState(false);
// const [score, setScore] = useState(0);

export default function Home() {
  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  // };

  // const handleNextQuestion = () => {
  //   if (selectedOption === questions[currentQuestion].correctOption) {
  //     setScore(score + 1);
  //   }
  //   setSelectedOption(null);
  //   if (currentQuestion === questions.length - 1) {
  //     setShowResult(true);
  //   } else {
  //     setCurrentQuestion(currentQuestion + 1);
  //   }
  // };

  // const handleStartGame = () => {
  //   setCurrentQuestion(0);
  //   setSelectedOption(null);
  //   // setShowResult(false);
  //   // setScore(0);
  // };

  return (
    <main className="bg-purpleDark w-screen min-h-screen">
      <header className="bg-purplaLight w-full p-8">
        <nav className="flex gap-4 list-none justify-center">
          <li className="text-lg font-semibold hover:border-b hover:border-b-green">
            HOME
          </li>
          <li className="text-lg font-semibold hover:border-b hover:border-b-green">
            TEST
          </li>
          <li className="text-lg font-semibold hover:border-b hover:border-b-green">
            TEST
          </li>
        </nav>
      </header>
      <section className="my-12">
        <div className=" mt-8 bg-purple w-1/2 p-8 rounded-md mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">QUIZ DO MILHÃO</h1>
            <p className="text-lg mb-4">
              Responda todas as perguntas corretamente para ganhar um token
            </p>
            <button
              className="border-2 border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded"
              // onClick={handleStartGame}
            >
              START
            </button>
          </div>

          <div className="flex flex-col ">
            <h1 className="text-3xl font-bold mb-4 text-center">RESPONDA</h1>
            <p className="text-xs text-green">.01</p>
            <p className="text-lg mb-4">Pergunta aqui</p>
            <ul className="flex flex-col gap-4">
              <li className="border border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded">
                1- Napoleão Bonaparte
              </li>
              <li className="border border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded">
                2- Cleitin do Grau
              </li>
              <li className="border border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded">
                3-
              </li>
              <li className="border border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded">
                4-
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
