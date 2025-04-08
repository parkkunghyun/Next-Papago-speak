import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

type Params = {
  inputText: string
  ttsLanguage: string
}

export const useTextToSpeech = () => {
  const mutation = useMutation({
    mutationFn: async ({ inputText, ttsLanguage }: Params) => {
      const res = await fetch('/api/texttospeech', {
        method: 'POST',
        body: JSON.stringify({ inputText, ttsLanguage }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.details || 'TTS 변환 실패')
      }

      return data.audioContent
    },
    onError: (error: any) => {
      toast.error(error.message || 'TTS 변환 실패')
    },
  })

  return mutation
}
