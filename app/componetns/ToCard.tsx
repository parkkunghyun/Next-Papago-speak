import React from 'react'
import { RxSpeakerLoud } from "react-icons/rx";
import { GoCopy } from "react-icons/go";
import { useCopyToClipboard } from '../hooks/useCopy';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { toast } from 'react-toastify';

type Props = {
  dataText: string
  selectedLanguage: string
  setSelectedLanguage: (s: string) => void
  isPendingText: boolean
}

const languageCodeMap: Record<string, string> = {
  en: 'en-US',
  ko: 'ko-KR',
  zh: 'cmn-CN',
  ja: 'ja-JP',
}

const ToCard = ({ dataText, selectedLanguage, setSelectedLanguage, isPendingText }: Props) => {
  const { mutate, isPending } = useTextToSpeech()
  const { copyToClipboard } = useCopyToClipboard()

  const handlePlay = () => {
    if (!dataText.trim()) {
      toast.error("읽어줄 문장을 입력해주세요!")
      return
    }

    const ttsLanguage = languageCodeMap[selectedLanguage] || 'ko-KR'

    mutate(
      { inputText: dataText, ttsLanguage },
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
      <div className='h-[50px] flex items-center p-2 border-b-2 border-white'>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-transparent text-white outline-none"
        >
          <option className='text-black' value="en">영어</option>
          <option className='text-black' value="ko">한국어</option>
          <option className='text-black' value="zh">중국어</option>
          <option className='text-black' value="ja">일본어</option>
        </select>
      </div>

      <p className="h-[284px] text-white p-4 font-bold overflow-y-auto">
        {dataText ? dataText : isPendingText ? "번역 중 입니다..." : "번역한 결과가 출력됩니다."}
      </p>

      <div className='h-[50px] border-t-2 border-white flex items-center justify-between'>
        <div className='ml-4 mt-2 text-white flex items-center gap-4'>
          <RxSpeakerLoud
            onClick={handlePlay}
            className={`text-2xl hover:scale-110 cursor-pointer ${isPending && 'animate-pulse cursor-not-allowed'}`}
          />
          <GoCopy
            onClick={() => copyToClipboard(dataText)}
            className='text-2xl hover:scale-110 cursor-pointer'
          />
        </div>
      </div>
    </div>
  )
}

export default ToCard
