'use client'

import type { AllLocales, I18nLangKeys, LocaleKeys, PathValue } from '@/i18n'
import { useParams } from 'next/navigation' // next/navigation으로 변경
import { useCallback } from 'react'
import { getNestedValue, i18nConfig, interpolateString } from '@/i18n'

// 주어진 키의 로컬라이즈된 값의 타입을 가져옵니다
type LocalizedValue<T, K extends LocaleKeys> =
  PathValue<T, K> extends string ? string : PathValue<T, K>

export const useLocale = () => {
  const params = useParams()

  // URL 매개변수에서 현재 언어를 가져옵니다
  const currentLocale = ((params?.lang as I18nLangKeys) || 'en') as I18nLangKeys

  const t = useCallback(
    <K extends LocaleKeys>(
      key: K,
      withData: Record<string, any> = {},
    ): LocalizedValue<AllLocales, K> => {
      const template = getNestedValue(i18nConfig[currentLocale], key)

      if (typeof template === 'string') {
        return interpolateString(template, withData) as LocalizedValue<AllLocales, K>
      }

      return template as LocalizedValue<AllLocales, K>
    },
    [currentLocale],
  )

  return {
    currentLocale,
    t,
  }
}
