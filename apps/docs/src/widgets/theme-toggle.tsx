'use client'

import clsx from 'clsx'
import { useTheme } from 'nextra-theme-docs'
import { useCallback } from 'react'
import { Toggle } from '@/components/ui/toggle'

/**
 * 다크 모드를 빠르게 전환하는 컴포넌트, nextra 기본 토글 드롭다운을 덮어씁니다
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()

  const changeTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [setTheme, theme])

  return (
    <Toggle size="sm" className={clsx(['cursor-pointer', className])} onClick={changeTheme}>
      <span className="icon-[ri--sun-fill] dark:icon-[ri--moon-clear-fill]"></span>
    </Toggle>
  )
}
