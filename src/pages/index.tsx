import { Inter } from "next/font/google";
import { questions } from "../components/questions";
import React, { useState } from "react";
import Link from "next/link";
import { mintToken } from "../lib/api";
import { ArrowRightIcon, FaceIcon } from "@radix-ui/react-icons";

const inter = Inter({ subsets: ["latin"] });

interface Raffle {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showFailed, setShowFailed] = useState<boolean | null>(false);
  const [raffledItems, setRaffledItems] = useState<Raffle[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const [hash, setHash] = useState<string>("");
  const [confirmedTransfer, setConfirmedTransfer] = useState<boolean>(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedOption(option);
  };

  function handleStartQuiz(): void {
    const raffledItems = getRandonQuestions();
    setRaffledItems(raffledItems);
    setQuizStarted(true);
    setIsAnswerCorrect(null);
  }

  function handleReset(): void {
    setQuizStarted(false);
    setConfirmedTransfer(false);
    setCurrentQuestionIndex(0);
    setIsAnswerCorrect(null);
    setSelectedOption(null);
    setShowFailed(false);
  }

  function getRandonQuestions() {
    const raffle: {
      id: number;
      question: string;
      options: string[];
      correctIndex: number;
    }[] = [];
    while (raffle.length < 10) {
      const randonItem = Math.floor(Math.random() * questions.length);
      if (!raffle.includes(questions[randonItem])) {
        raffle.push(questions[randonItem]);
      }
    }
    return raffle;
  }

  function handleValidateAnswer(questionIndex: number, optionIndex: number) {
    const currentQuestion = raffledItems[questionIndex];
    const correctAnswerIndex: number = currentQuestion.correctIndex;

    if (optionIndex === correctAnswerIndex) {
      setIsAnswerCorrect(true);
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsAnswerCorrect(false);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setShowFailed(true);
      setQuizStarted(false);
    }
  }

  const handleValidateWallet: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await mintToken(walletAddress);
      setHash(res.hash);
      console.log(hash);
      setWalletAddress("");
    } catch (error) {
    } finally {
      setConfirmedTransfer(true);
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-purpleDark w-screen min-h-screen">
      <header className="bg-purple w-full p-8 border-b border-purpleHover">
        <nav className="flex gap-4 list-none justify-center">
          <li className="text-lg font-semibold hover:border-b hover:border-b-purpleHover">
            <Link
              href="https://www.linkedin.com/in/joao-vitorandrade/"
              target="_blank"
            >
              LINKEDIN
            </Link>
          </li>
          <li className="text-lg font-semibold hover:border-b hover:border-b-purpleHover">
            <Link
              href="https://github.com/AndradeJaum/Quiz-com-Web3"
              target="_blank"
            >
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
              {showFailed ? (
                <p className="mb-4 text-center p-4 rounded bg-red">
                  Resposta Errada. Tente novamente
                </p>
              ) : (
                ""
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
              {confirmedTransfer ? (
                <>
                  <div className="flex flex-col w-full">
                    <h3 className="text-2xl font-bold mb-4 m-auto">
                      Transferência enviada com sucesso!
                    </h3>
                    <p className="mt-4 font-semibold">PROTOCOLO CELO</p>
                    <p className="mb-4">Hash:</p>
                    <div className="bg-green text-purple p-4 rounded">
                      <p className="break-words	">{hash}</p>
                    </div>
                    <form
                      onSubmit={handleReset}
                      className="flex justify-between"
                    >
                      <button
                        type="submit"
                        className="border-2 border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded mt-4"
                      >
                        Home
                      </button>
                      <Link
                        href="https://alfajores.celoscan.io/"
                        target="_blank"
                        className="flex gap-2 border-2 border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded mt-4"
                      >
                        CELO <ArrowRightIcon className="m-auto" />
                      </Link>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">Perguntas</h2>
                    <p className="text-xs my-auto text-green">
                      {currentQuestionIndex} / {raffledItems.length}
                    </p>
                  </div>

                  {currentQuestionIndex < raffledItems.length ? (
                    <>
                      <p className="mb-4">
                        {raffledItems[currentQuestionIndex].question}
                      </p>
                      <ul className="flex flex-col gap-4">
                        {raffledItems[currentQuestionIndex].options.map(
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
                          if (selectedOption) {
                            handleValidateAnswer(
                              currentQuestionIndex,
                              raffledItems[
                                currentQuestionIndex
                              ].options.indexOf(selectedOption)
                            );
                            setSelectedOption(null);
                          }
                          setIsAnswerCorrect(null);
                        }}
                        disabled={!selectedOption}
                      >
                        PRÓXIMA PERGUNTA
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="border-b border-green w-full mb-8">
                        <p className=" py-4">Parabéns! Você concluiu o quiz.</p>
                      </div>
                      <form onSubmit={handleValidateWallet}>
                        <div>
                          <p className="mb-4">
                            Insira o endereço da sua carteira para receber o
                            token do protocolo CELO
                          </p>
                          <input
                            type="text"
                            placeholder="Wallet address"
                            className="w-full p-2 rounded outline-none bg-purple border border-green mb-4"
                            value={walletAddress}
                            onChange={(event) => {
                              setWalletAddress(event.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="flex justify-end">
                          {!isLoading ? (
                            <button
                              className={`p-2 bg-green text-purple font-semibold rounded ${
                                walletAddress.length == 42
                                  ? ""
                                  : "opacity-50 cursor-not-allowed"
                              }`}
                              type="submit"
                              disabled={walletAddress.length !== 42}
                            >
                              Receber
                            </button>
                          ) : (
                            <div className="w-8 h-8 border-b-2 border-l-2 border-green rounded-full animate-spin	"></div>
                          )}
                        </div>
                      </form>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
