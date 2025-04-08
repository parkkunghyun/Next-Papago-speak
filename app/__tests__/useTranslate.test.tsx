import React from 'react';
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslate } from '../hooks/useTranslate'
import { describe, it, expect, vi } from 'vitest'

// QueryClientProvider 셋팅
const createWrapper = () => {
  const queryClient = new QueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useTranslate', () => {
  it('성공적으로 translatedText 리턴', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ translatedText: '안녕하세요' }),
    }) as any

    const { result } = renderHook(() => useTranslate(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ inputText: 'hello', selectedLanguage: 'ko' })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toBe('안녕하세요')
    })
  })

  it('에러 발생시 onError 처리', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: '번역 실패' }),
    }) as any

    const { result } = renderHook(() => useTranslate(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ inputText: 'hello', selectedLanguage: 'ko' })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
  })
})
