## 프로젝트 소개

이 프로젝트는 Turborepo와 React를 기반으로 웹, 모바일, 데스크탑 애플리케이션을 모두 지원하는 크로스플랫폼 개발 환경입니다. 모노레포 구조를 통해 코드를 공유하며, React 기반 아키텍처로 빠르고 효율적인 개발이 가능합니다.

## 빠른 실행

```bash
# 모든 앱 동시 실행 (추천)
turbo dev

# 특정 앱만 실행 (Turborepo 기능 유지)
turbo dev --filter=web
turbo dev --filter=docs
turbo dev --filter=mobile
turbo dev --filter=desktop
turbo start --filter=api

# 여러 앱 동시 실행
turbo dev --filter=docs --filter=web

# 잔여파일 제거
turbo clean
```

### 데이터베이스 (Supabase)

로컬 개발 환경에서 Supabase를 사용합니다:

```bash
# Supabase 시작
pnpm db:dev

# 상태 확인
pnpm db:status

# 중지
pnpm db:stop

# 데이터베이스 리셋
pnpm db:reset

# TypeScript 타입 생성 (Supabase 실행 중이어야 함)
pnpm db:types

# 마이그레이션
pnpm db:migration:new <name>  # 마이그레이션 파일 생성
pnpm db:migration:up          # 로컬 DB에 적용하여 테스트
pnpm db:migration:down        # 롤백 테스트
```

자세한 사용 방법은 `packages/database/README.md`를 참조하세요.

### 개발 서버 포트

각 앱이 실행되는 포트:

- **web**: http://localhost:5678 (Next.js + Payload CMS)
- **api**: http://localhost:4321 (NestJS 커스텀 API - 선택적)
- **docs**: http://localhost:7822 (Nextra 문서 사이트)
- **desktop**: http://localhost:23456 (Electron 앱 - webpack-dev-server)
- **mobile**: http://localhost:8081 (React Native 번들러)
- **database**: http://localhost:54323/ (Supabase)

> 참고: 각 포트가 이미 점유되어 있으면 프레임워크가 자동으로 다음 포트로 변경해 실행될 수 있습니다.

```bash
# 모든 앱 동시 실행 (추천)
turbo start

# 특정 앱만 실행 (Turborepo 기능 유지)
turbo start --filter=web
turbo start --filter=docs
turbo start --filter=mobile
turbo start --filter=desktop
turbo start --filter=api

# 여러 앱 동시 실행
turbo start --filter=docs --filter=web
```

## 시작하기

```bash
# Node.js 설치 (LTS 권장): https://nodejs.org
node -v
npm -v

# pnpm 설치
npm install -g pnpm

# 설치 확인
pnpm -v

# 의존성 설치 (루트에서)
pnpm install

# Payload용 환경 파일 생성
node -e "require('fs').copyFileSync('apps/web/.env.example', 'apps/web/.env'); console.log('Created apps/web/.env');"
```

## 제거하기

```bash
# 모든 node_modules 삭제 (깨끗한 재설치를 위해)
pnpm delete

# 삭제 후 재설치 (한 번에 실행)
pnpm reinstall
```

## 워크스페이스 생성하기

```bash
# 빈 워크스페이스 생성
turbo gen workspace --name my-app --empty

# 기존 워크스페이스 복사
turbo gen workspace --name new-app --copy web

# GitHub 프로젝트 기반
turbo gen workspace --name my-app --copy https://github.com/vercel/next-app-router-playground

# 질문에 답변:
# - Add workspace dependencies? → No (독립 유지)
```

## 주요 특징

- 단일 코드베이스로 웹, 모바일, 데스크탑 애플리케이션을 개발합니다.
- Turborepo를 통한 효율적인 모노레포 관리를 제공합니다.
- 빌드 캐싱과 병렬 실행으로 개발 생산성을 향상시킵니다.
- 코드 공유와 재사용으로 유지보수 비용을 절감합니다.
- 웹 중심 구조로 신속한 기능 업데이트와 배포를 지원합니다.

## 기술 스택

### 코드 관리

- `pnpm`: 패키지 매니저
- `Turborepo`: 모노레포 환경 조성
- `TypeScript`: 핵심 언어

### 플랫폼별 도구

- `Next.js`: 웹 애플리케이션 프레임워크
- `Electron`: 데스크탑 애플리케이션 프레임워크
- `React Native`: 모바일 애플리케이션 프레임워크

### 프론트엔드

- `React`: 프론트엔드 라이브러리
- `Tailwind CSS`: 스타일링 프레임워크

### 백엔드

- `Payload CMS`: 헤드리스 CMS (올인원 백엔드)
  - REST API 자동 생성
  - GraphQL API 자동 생성
  - Admin UI 내장
  - 인증 및 권한 관리
  - 파일 업로드 지원
  - TypeScript 네이티브 지원
- `NestJS`: 커스텀 로직 확장 (선택적)
  - 복잡한 비즈니스 로직
  - 외부 서비스 통합
  - 배치 작업/스케줄링
  - Payload로 처리하기 어려운 특수 기능

### 데이터베이스

- `PostgreSQL`: 관계형 데이터베이스 (Supabase 로컬 개발)

### 추가 기능

- `Nextra`: 문서화 프레임워크
- `Supabase`: 로컬 개발 환경 (CLI 기반)

## 프로젝트 구조

```
how-to-use-turborepo/
├── apps/                          # 애플리케이션
│   ├── web/                      # Next.js 웹 애플리케이션 (Payload CMS)
│   ├── api/                      # NestJS 커스텀 API (선택적)
│   ├── mobile/                   # React Native 모바일 앱
│   ├── desktop/                  # React + Electron 데스크탑 앱
│   └── docs/                     # Nextra 문서 사이트
│
├── packages/                      # 공유 패키지
│   ├── database/                 # 데이터베이스 설정 (Supabase 로컬 개발)
│   │   ├── database.types.ts     # - Supabase DB 타입 (자동 생성)
│   │   ├── supabase/             # - Supabase 설정 및 마이그레이션
│   │   └── README.md             # - Supabase 사용 가이드
│   ├── typescript-config/        # TypeScript 설정
│   └── eslint-config/            # ESLint 설정
│
├── turbo.json                     # Turborepo 설정
└── package.json                   # 루트 패키지
```

> **참고**: 각 워크스페이스에 대한 자세한 설명은 각 워크스페이스 루트 아래에 있는 `README.md`를 참고하세요.

### 의존성 관리 전략

현재 공유 패키지:

- `@repo/database`: 데이터베이스 연결 설정 및 유틸리티
- `@repo/typescript-config`: TypeScript 설정
- `@repo/eslint-config`: ESLint 설정

워크스페이스 추가 시 권장사항:

- 필수 공유: `@repo/database` (DB 연결)
- 설정 공유: `@repo/eslint-config`, `@repo/typescript-config`
- 독립 유지: UI 라이브러리 (shadcn/ui, Ant Design 등), 유틸리티 함수는 각 앱에서 관리

수동 추가 예시:

```bash
pnpm add -D @repo/eslint-config @repo/typescript-config --filter my-app
```

## 개발 가이드

자세한 개발 가이드는 `docs/architecture.md` 문서를 참조하시기 바랍니다.
