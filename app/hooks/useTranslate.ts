import { useMutation } from "@tanstack/react-query";

type TranslateParams = {
    inputText: string,
    selectedLanguage: string
}

const fetchTranslate = async({inputText, selectedLanguage} : TranslateParams) => {
    const res = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({inputText, selectedLanguage})
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || '번역 실패')
      }
      return data.translatedText;
}

export const useTranslate = () => {
    return useMutation({
        mutationFn: fetchTranslate,
    })
}