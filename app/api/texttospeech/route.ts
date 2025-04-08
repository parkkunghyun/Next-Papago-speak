import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY;
const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

export async function POST(req : any) {
    try {
        const { inputText, ttsLanguage } = await req.json();

        const requestBody = {
            input: { text: inputText },  // 기본 텍스트 형식
            voice: { languageCode: ttsLanguage },
            audioConfig: { audioEncoding: 'MP3', speakingRate: 1.0 },
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API 호출 실패: ${response.statusText}, ${errorText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return NextResponse.json({ audioContent: data.audioContent });
    } catch (error : any) {
        console.error('TTS API Error:', error.message);
        return NextResponse.json(
            { error: '음성 합성 오류가 발생했습니다.', details: error.message },
            { status: 500 }
        );
    }
}