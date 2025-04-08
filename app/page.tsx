"use client"

import Image from "next/image";
import FromCard from "./componetns/FromCard";
import ToCard from "./componetns/ToCard";
import { useEffect, useState } from "react";
import { useTranslate } from "./hooks/useTranslate";
import { toast } from "react-toastify";


export default function Home() {
  const [inputText ,setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const {mutate, data, isPending, isError, error} = useTranslate();

  const handleTranslate = () => {
    if (!inputText.trim()) { 
      toast.warn("번역할 단어나 문장을 입력해주세요!");
      return;
  }

  mutate({ inputText, selectedLanguage });
  }
  console.log(data, selectedLanguage);

  useEffect(() => {
    handleTranslate();
  }, [selectedLanguage]);

  return (
    <div className="w-full flex flex-col items-center pt-20 min-h-screen bg-[#1E1E1E]">
     <div className="flex items-center gap-4">
        <h1 className="text-4xl text-white font-bold">Goat <span className="text-[#FF8C00]">Speak</span></h1>
        <Image src="/images/goatius.png" alt="goat img" width={100} height={100}/>
     </div>

     {/*카드 부분 */}
     <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <FromCard 
          inputText={inputText} 
          setInputText={setInputText} 
          isPendingText={isPending}
          handleTranslate={handleTranslate}
        />
        <ToCard
          dataText={data}
          isPendingText={isPending}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
     </div>
    </div>
  );
}
