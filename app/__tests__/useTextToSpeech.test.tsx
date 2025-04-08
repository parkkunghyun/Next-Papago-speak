import React from 'react';
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTextToSpeech } from '../hooks/useTextToSpeech'
import { describe, it, expect, vi } from 'vitest'

const createWrapper = () => {
  const queryClient = new QueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useTextToSpeech', () => {
  it('성공적으로 audioContent를 리턴', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ audioContent: 'mock-audio' }),
    }) as any

    const { result } = renderHook(() => useTextToSpeech(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ inputText: 'hello', ttsLanguage: 'ko-KR' })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toBe('mock-audio')
    })
  })

  it('에러 발생시 onError 호출', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ details: 'mock-error' }),
    }) as any

    const { result } = renderHook(() => useTextToSpeech(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ inputText: 'hello', ttsLanguage: 'ko-KR' })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
  })
})
