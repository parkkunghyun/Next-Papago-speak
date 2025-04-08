import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY;

const URL = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

export async function POST(req: any) {
    try {
        const {inputText, selectedLanguage} = await req.json();
        const response = await fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                q: inputText,
                target: selectedLanguage
            }),
        });
        if (!response.ok) {
            throw new Error(`API 호출 실패: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return NextResponse.json({ translatedText: data.data.translations[0].translatedText });
    } catch (e : any) {
        console.error('Translation API Error:', e.message);
        return NextResponse.json(
            { error: '번역 오류가 발생했습니다.', details: e.message },
            { status: 500 }
        );
    }
}