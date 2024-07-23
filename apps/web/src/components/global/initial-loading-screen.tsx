import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const PHRASES = [
  "Recebendo pedidos...",
  "Preparando histórico...",
  "Conectando aos clientes...",
];

export default function InitialLoadingScreen() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const nextPraseIndex =
        currentPhraseIndex === PHRASES.length - 1 ? 0 : currentPhraseIndex + 1;

      setCurrentPhraseIndex(nextPraseIndex);
    }, 5000);
  }, [currentPhraseIndex]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full ">
        <div className="w-full flex items-center flex-col justify-center gap-10">
          <h1 className="text-gray-900 text-4xl font-semibold italic">
            Cursos +
          </h1>
          <div className="w-full flex items-center flex-col justify-center gap-2">
            <Progress value={60} className="h-2" />
            <span className="text-gray-700 text-lg italic">
              {PHRASES[currentPhraseIndex]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
