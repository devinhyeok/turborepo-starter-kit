import en from './en'
import ko from './ko'

export const i18nConfig = Object.freeze({
  en,
  ko,
})

export type I18nLangKeys = keyof typeof i18nConfig
export interface I18nLangAsyncProps {
  lang: I18nLangKeys
}

// 모든 언어 객체의 유니온 타입을 가져옵니다
export type AllLocales = (typeof i18nConfig)[I18nLangKeys]

type DeepKeys<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${(K & string) | number}.${DeepKeys<T[K]>}`
    : `${(K & string) | number}`
}[keyof T & (string | number)]

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

// 모든 가능한 키를 가져옵니다
export type LocaleKeys = NestedKeyOf<AllLocales>

type DeepObject = Record<string, any>

// 주어진 경로에서 값의 타입을 추출합니다
export type PathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? PathValue<T[Key], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never

// 중첩된 값을 가져옵니다
export function getNestedValue<T extends DeepObject, K extends string>(
  obj: T,
  path: K,
): PathValue<T, K> {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj) as PathValue<T, K>
}

// 값 표현식을 삽입합니다
export function interpolateString(template: string, context: Record<string, any>): string {
  return template.replace(/\{\{\s*(\w+(\.\w+)*)\s*\}\}/g, (_, path) => {
    const value = getNestedValue(context, path.trim())
    return value !== undefined ? value : `{{${path.trim()}}}`
  })
}
