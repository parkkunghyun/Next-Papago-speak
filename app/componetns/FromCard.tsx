import React from 'react'
import { RxSpeakerLoud } from "react-icons/rx";
import { GoCopy } from "react-icons/go";
import { useCopyToClipboard } from '../hooks/useCopy';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { toast } from 'react-toastify';

type Props = {
  inputText: string,
  setInputText: (s: string) => void,
  handleTranslate: () => void,
  isPendingText: boolean
}

const FromCard = ({inputText, setInputText, handleTranslate, isPendingText} : Props) => {
  const {mutate, data, isPending} = useTextToSpeech();
  const { copyToClipboard } = useCopyToClipboard();

  const handlePlay = () => {
    if (!inputText.trim()) {
      toast.error("읽어줄 문장을 입력해주세요!")
      return;
    }
  
    mutate(
      { inputText, ttsLanguage: 'ko-KR' },  // 언어코드는 상황에 맞게
      {
        onSuccess: (audioContent) => {
          const audio = new Audio(`data:audio/mp3;base64,${audioContent}`)
          audio.play()
        },
      }
    )
  }
  return (
    <div className='border-2 border-white w-[400px] h-[400px] rounded-2xl'>
        <div className='h-[50px] border-b-2 border-white'>

        </div>

        <textarea 
            value={inputText} onChange={(e) => setInputText(e.target.value)}
            placeholder='번역하고 싶은 단어나 문장을 입력해주세요.'
            className="h-[280px] w-full resize-none font-bold text-white p-4 placeholder:text-white focus:outline-none"
            name="inputText" id="inputText">
        </textarea>

        <div className='h-[50px] border-t-2 border-white flex items-center justify-between'>
            <div className='ml-4 mt-2 text-white flex items-center gap-4'>
                <RxSpeakerLoud onClick={handlePlay}
                  className='text-2xl hover:scale-110 cursor-pointer'/>
                <GoCopy onClick={() => copyToClipboard(inputText)}
                className='text-2xl hover:scale-110 cursor-pointer'/>
            </div>
            <button onClick={handleTranslate}
              className='bg-white mt-2 cursor-pointer h-[61px] rounded-br-xl px-4 hover:bg-gray-100 '>{isPendingText ? "번역 중..." : "번역하기"}</button>
        </div>
    </div>
  )
}

export default FromCard