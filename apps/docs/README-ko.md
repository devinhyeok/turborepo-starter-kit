# Nextra 문서 사이트

한국어 | [English](README.md)

Next.js와 Nextra 기반의 다국어 문서 사이트입니다. Turborepo 모노레포 환경에서 구동됩니다.

## 주요 기술

- Next.js 15.5.4
- Nextra 4.5.1
- React 19.1.1
- TypeScript 5.9.2
- Tailwind CSS 4.1.13
- Turbopack

## 주요 특징

- 다국어 지원: 한국어, 영어
- 서버 컴포넌트 기반 아키텍처
- Turbopack 기반 빠른 개발 환경
- 드롭다운 언어 전환기
- 다크모드 지원
- 페이지 복사 기능

## 필수 요구사항

- Node.js 20.x 이상
- pnpm 9.x 이상

## 설치 및 실행

프로젝트 루트에서 다음 명령어를 실행합니다.

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (Turbopack)
turbo dev --filter=docs
```

브라우저에서 `http://localhost:7822`로 접속합니다.

## 빌드

```bash
# 프로덕션 빌드
turbo build --filter=docs

# 빌드 결과 실행
turbo start --filter=docs
```

## 캐시 관리

```bash
# 빌드 캐시 삭제
turbo clean --filter=docs
```

## 프로젝트 구조

```
apps/docs/
├── src/
│   ├── app/
│   │   └── [lang]/           # 언어별 라우팅
│   ├── content/
│   │   ├── ko/               # 한국어 콘텐츠
│   │   └── en/               # 영어 콘텐츠
│   ├── i18n/                 # 다국어 설정
│   ├── widgets/              # UI 컴포넌트
│   └── components/           # Shadcn UI 컴포넌트
├── public/                   # 정적 파일
└── next.config.ts            # Next.js 설정
```

## 콘텐츠 작성

콘텐츠는 `src/content/{lang}` 폴더에 MDX 형식으로 작성합니다.

```
src/content/
├── ko/
│   ├── _meta.tsx             # 네비게이션 메타데이터
│   ├── index.mdx             # 홈페이지
│   └── docs/
│       ├── _meta.tsx
│       └── index.mdx
└── en/
    └── ...
```

## 다국어 설정

언어 추가는 다음 파일들을 수정합니다.

- `src/i18n/index.ts`: 언어 목록 추가
- `src/i18n/{lang}.ts`: 번역 파일 생성
- `src/content/{lang}/`: 콘텐츠 폴더 생성
- `next.config.ts`: locales 배열에 추가

## Shadcn UI 사용

컴포넌트 추가는 다음 명령어를 사용합니다.

```bash
cd apps/docs
pnpm dlx shadcn@latest add {component-name}
```

## 라이선스

MIT License | Copyright © 2025
