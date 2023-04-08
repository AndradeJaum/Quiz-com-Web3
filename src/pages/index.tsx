import { Inter } from "next/font/google";
import { questions } from "./questions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-purpleDark w-screen min-h-screen">
      <header className="bg-purpleLight w-full p-8">
        <nav className="flex gap-4 list-none justify-center">
          <li className="text-lg font-semibold hover:border-b hover:border-b-green">
            LINKEDIN
          </li>
          <li className="text-lg font-semibold hover:border-b hover:border-b-green">
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
            <button className="border-2 border-green text-green hover:bg-purpleHover hover:text-purple font-bold py-2 px-4 rounded">
              START
            </button>
          </div>

          <div className="flex flex-col ">
            <h2 className="text-3xl font-bold mb-4">RESPONDA</h2>

            <p className="text-lg mb-4"></p>
            <ul className="flex flex-col gap-4">
              <li></li>
            </ul>
            <button>PRÓXIMA PERGUNTA</button>

            <p className="text-lg mb-4">Parabéns! Você concluiu o quiz.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
