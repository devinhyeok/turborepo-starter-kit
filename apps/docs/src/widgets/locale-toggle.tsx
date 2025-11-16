'use client'

import type { I18nLangKeys } from '@/i18n'

import clsx from 'clsx'
import { addBasePath } from 'next/dist/client/add-base-path'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale } from '@/hooks'
import { i18nConfig } from '@/i18n'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

// 지원하는 locale 목록
const availableLocales = Object.keys(i18nConfig) as I18nLangKeys[]

// locale별 표시 이름
const localeNames: Record<I18nLangKeys, string> = {
  ko: '한국어',
  en: 'English',
}

/**
 * 언어 전환 드롭다운 컴포넌트 (개선된 스타일)
 */
export default function LocaleToggle({ className }: { className?: string }) {
  const { currentLocale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = useCallback(
    (nextLocale: I18nLangKeys) => {
      // 스크롤 위치 기록
      const currentPosition = window.scrollY
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight

      // 경로에서 현재 locale을 다음 locale로 교체
      const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
      const nextHref = addBasePath(`/${nextLocale}${pathWithoutLocale}`)

      const date = new Date(Date.now() + ONE_YEAR)
      document.cookie = `NEXT_LOCALE=${nextLocale}; expires=${date.toUTCString()}; path=/`

      router.replace(nextHref)

      // 라우팅 후 스크롤 위치 복원
      requestAnimationFrame(() => {
        if (isAtBottom) {
          window.scrollTo(0, document.body.scrollHeight)
        } else {
          window.scrollTo(0, currentPosition)
        }
      })
    },
    [currentLocale, pathname, router],
  )

  return (
    <div className={clsx('relative inline-block', className)}>
      <Select value={currentLocale} onValueChange={(value) => changeLocale(value as I18nLangKeys)}>
        <SelectTrigger aria-label="언어 선택">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {availableLocales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {localeNames[locale]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
