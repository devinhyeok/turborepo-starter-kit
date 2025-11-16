## 아키텍처 개요

이 프로젝트는 Turborepo 기반 모노레포 구조로, 웹, 모바일, 데스크탑 애플리케이션을 단일 코드베이스에서 관리합니다. pnpm 워크스페이스를 통해 패키지 간 의존성을 관리하고, 공유 코드를 효율적으로 재사용합니다.

## 모노레포 구조

```
how-to-use-turborepo/
├── apps/                    # 애플리케이션 (독립 실행 가능)
│   ├── web/                 # Next.js + Payload CMS
│   ├── api/                 # NestJS 커스텀 API (선택적)
│   ├── mobile/              # React Native (Expo)
│   ├── desktop/             # Electron 데스크탑 앱
│   └── docs/                # Nextra 문서 사이트
│
├── packages/                # 공유 패키지 (앱 간 재사용)
│   ├── database/            # 데이터베이스 설정 (Supabase 로컬 개발)
│   │   ├── database.types.ts # - Supabase DB 타입 (자동 생성)
│   │   ├── supabase/          # - Supabase CLI 설정 및 마이그레이션
│   │   │   └── config.toml   # - Supabase 로컬 개발 설정
│   │   └── README.md
│   ├── typescript-config/  # TypeScript 설정 공유
│   └── eslint-config/      # ESLint 설정 공유
│
├── scripts/                 # 루트 레벨 스크립트
│   ├── clean.js             # 빌드 산출물 정리
│   └── delete.js            # node_modules 삭제
│
├── turbo.json               # Turborepo 태스크 설정
├── pnpm-workspace.yaml      # pnpm 워크스페이스 정의
└── package.json             # 루트 패키지 설정
```

## 애플리케이션 구조

### apps/web

Next.js 15 기반 웹 애플리케이션으로, Payload CMS를 백엔드로 사용합니다.

**주요 특징:**

- Next.js App Router 사용
- Payload CMS 3.64.0 (헤드리스 CMS)
- SQLite 데이터베이스 (개발용)
- REST API 및 GraphQL API 자동 생성
- Admin UI 내장

**포트:** http://localhost:5678

**주요 디렉토리:**

- `src/app/`: Next.js App Router 페이지 및 라우트
- `src/collections/`: Payload CMS 컬렉션 정의
- `src/blocks/`: 콘텐츠 블록 컴포넌트
- `src/components/`: 재사용 가능한 컴포넌트

### apps/docs

Nextra 기반 문서 사이트로, 프로젝트 문서를 제공합니다.

**주요 특징:**

- Next.js 15.5.4 (Turbopack)
- Nextra 문서 프레임워크
- 다국어 지원 (한국어/영어)
- i18n 라우팅

**포트:** http://localhost:7822

**주요 디렉토리:**

- `src/app/[lang]/`: 언어별 문서 페이지
- `src/content/`: 마크다운 문서 콘텐츠
- `src/components/`: 문서 전용 컴포넌트

### apps/mobile

React Native 기반 모바일 애플리케이션으로, Expo를 사용합니다.

**주요 특징:**

- React Native 0.81.5
- Expo ~54.0.23
- Expo Router (파일 기반 라우팅)
- 웹 지원 (react-native-web)
- React Compiler 활성화

**포트:**

- Metro Bundler: http://localhost:8081
- 웹: Expo가 자동 할당 (보통 http://localhost:19006)

**주요 디렉토리:**

- `app/`: Expo Router 파일 기반 라우팅
- `components/`: React Native 컴포넌트
- `hooks/`: 커스텀 훅

### apps/api

NestJS 기반 커스텀 API 서버입니다. **선택적**으로 사용하며, Payload CMS로 처리하기 어려운 복잡한 비즈니스 로직을 담당합니다.

**주요 특징:**

- NestJS 프레임워크
- TypeScript 네이티브 지원
- 모듈 기반 아키텍처
- 의존성 주입 (DI) 시스템

**사용 시나리오:**

- 복잡한 비즈니스 로직
- 외부 서비스 통합 (결제, 이메일 등)
- 배치 작업/스케줄링
- 특수한 데이터 처리
- Payload로 처리하기 어려운 기능

**사용하지 않는 경우:**

- 일반적인 CRUD 작업 (Payload로 충분)
- 인증/권한 관리 (Supabase/Payload로 충분)
- 파일 업로드 (Payload DAM으로 충분)
- 단순한 API 엔드포인트 (Payload 자동 생성)

**포트:** http://localhost:4321 (기본값, 필요 시 변경)

**주요 디렉토리:**

- `src/calculator/`: 계산기 API 예제
- `src/app.module.ts`: 메인 모듈
- `src/main.ts`: 애플리케이션 진입점

### apps/desktop

Electron 기반 데스크탑 애플리케이션입니다.

**주요 특징:**

- Electron 35.7.5
- React 렌더러 프로세스
- Webpack 빌드 시스템
- TypeScript 지원

**포트:** http://localhost:23456 (webpack-dev-server)

**주요 디렉토리:**

- `src/main/`: Electron 메인 프로세스
- `src/renderer/`: React 렌더러 프로세스
- `.erb/scripts/`: 빌드 및 설치 스크립트

## 공유 패키지 구조

### packages/database

Supabase CLI를 사용한 로컬 개발 환경 설정입니다.

**구조:**

- `database.types.ts`: Supabase DB 타입 (자동 생성, `pnpm db:types` 실행 시 생성)
- `supabase/`: Supabase CLI 설정 및 마이그레이션
  - `config.toml`: Supabase 로컬 개발 설정
  - `migrations/`: 데이터베이스 마이그레이션 파일 (필요 시 생성)

**포함되는 서비스 (로컬 개발):**

- PostgreSQL (데이터베이스)
- PostgREST (REST API)
- GoTrue (인증 서비스)
- Storage (파일 스토리지)
- Realtime (실시간 기능)
- Postgres-Meta (메타데이터 관리)
- Kong (API Gateway)
- Studio (웹 대시보드)

**용도:**

- 로컬 개발 환경에서 Supabase 사용
- 데이터베이스 마이그레이션 관리
- TypeScript 타입 자동 생성

### packages/typescript-config

공유 TypeScript 설정입니다.

**설정 파일:**

- `base.json`: 기본 설정
- `nextjs.json`: Next.js 전용 설정
- `react-library.json`: React 라이브러리 설정

### packages/eslint-config

공유 ESLint 설정입니다.

**설정 파일:**

- `base.js`: 기본 ESLint 규칙
- `next.js`: Next.js 전용 규칙
- `react-internal.js`: React 내부 규칙

## 의존성 관계

### 앱 간 의존성

현재 앱들은 서로 독립적으로 실행되며, 직접적인 의존성은 없습니다.

### 앱 → 패키지 의존성

```
apps/web
  └── @repo/typescript-config (TypeScript 설정)

apps/docs
  ├── @repo/typescript-config (TypeScript 설정)
  └── @repo/eslint-config (ESLint 설정)

apps/mobile
  └── (현재 공유 패키지 의존성 없음)

apps/desktop
  └── (현재 공유 패키지 의존성 없음)
```

### 패키지 간 의존성

```
packages/eslint-config
  └── (독립)

packages/typescript-config
  └── (독립)
```

## 빌드 파이프라인

### Turborepo 태스크

`turbo.json`에 정의된 주요 태스크:

- `build`: 의존성 패키지 빌드 후 앱 빌드
- `dev`: 개발 서버 실행 (캐시 비활성화, 지속 실행)
- `lint`: 의존성 패키지 린트 후 앱 린트
- `clean`: 빌드 산출물 정리

### 빌드 순서

1. 공유 패키지 빌드 (`packages/*`)
2. 애플리케이션 빌드 (`apps/*`)

의존성 그래프에 따라 자동으로 순서가 결정됩니다.

## 스크립트 관리 시스템

프로젝트는 `clean`, `delete`, `reinstall` 스크립트로 빌드 산출물과 의존성을 관리합니다. 모든 스크립트는 Node.js 네이티브 모듈(`fs.rmSync`)을 사용하여 외부 의존성 없이 안정적으로 동작합니다.

### clean 스크립트

빌드 산출물과 캐시를 정리합니다.

**실행 방식:**

```bash
pnpm clean
```

**구현 구조:**

1. Turborepo가 각 워크스페이스의 `clean` 스크립트를 병렬 실행
2. 루트 `scripts/clean.js`가 루트 레벨 정리 수행

**루트 clean 스크립트** (`scripts/clean.js`):

- Node.js CommonJS 사용
- `node_modules`, `.turbo` 디렉토리 삭제
- `fs.rmSync`로 재귀적 삭제 (외부 패키지 불필요)

**앱별 clean 스크립트:**

- `apps/web/scripts/clean.js`: `.next`, `.turbo` 삭제 (ESM)
- `apps/docs/scripts/clean.js`: `.next`, `.turbo` 삭제 (ESM)
- `apps/mobile/scripts/clean.js`: `.expo`, `.turbo`, `dist`, `.next` 삭제 (CommonJS)
- `apps/desktop/.erb/scripts/clean-simple.js`: `dist`, `build`, `dll`, `.turbo` 삭제 (CommonJS)

**설계 이유:**

- Node.js 네이티브 모듈 사용으로 `node_modules`가 없어도 동작
- 외부 패키지(`rimraf` 등) 의존성 제거로 안정성 향상
- 크로스 플랫폼 호환성 보장

### delete 스크립트

모든 `node_modules`와 캐시를 삭제합니다.

**실행 방식:**

```bash
pnpm delete
```

**구현 구조** (`scripts/delete.js`):

1. 재귀적으로 모든 `node_modules` 디렉토리 탐색
2. `.turbo` 캐시 디렉토리 삭제
3. `fs.rmSync`로 안전하게 삭제

**동작 과정:**

- 루트부터 시작하여 모든 하위 디렉토리 탐색
- `node_modules` 디렉토리 발견 시 삭제 목록에 추가
- `.git`, `.turbo` 등 특정 디렉토리는 제외
- 발견된 모든 `node_modules` 삭제

**설계 이유:**

- pnpm 모노레포에서 여러 위치에 `node_modules`가 생성됨
- 깨끗한 재설치를 위해 모든 의존성 제거 필요
- 수동 삭제 대신 자동화로 실수 방지

### reinstall 스크립트

삭제 후 재설치를 한 번에 수행합니다.

**실행 방식:**

```bash
pnpm reinstall
```

**구현 구조:**

```json
"reinstall": "pnpm delete && pnpm install"
```

**동작 과정:**

1. `pnpm delete` 실행 (모든 `node_modules` 삭제)
2. `pnpm install` 실행 (의존성 재설치)

**설계 이유:**

- 자주 사용하는 작업을 한 명령어로 단순화
- 순차 실행으로 안전한 재설치 보장

### Electron 바이너리 설치

desktop 앱의 `postinstall` 스크립트에서 Electron 바이너리를 자동 설치합니다.

**구현 구조** (`apps/desktop/.erb/scripts/install-electron.js`):

1. Electron 바이너리 존재 여부 확인
2. pnpm 모노레포 구조에서 Electron 패키지 탐색
3. `install.js` 스크립트 발견 시 실행

**동작 과정:**

- `checkElectronBinary()`: 바이너리 존재 여부 확인
- `findElectronInstallScript()`: pnpm `.pnpm` 디렉토리에서 Electron 패키지 탐색
- `require(installPath)`: Electron의 내장 설치 스크립트 실행

**설계 이유:**

- pnpm 모노레포에서 Electron 바이너리가 자동 설치되지 않는 문제 해결
- `.pnpm` 디렉토리 구조를 고려한 탐색 로직
- 배열 메서드(`find`) 사용으로 함수형 스타일 유지

**통합 위치:**

```json
"postinstall": "node .erb/scripts/install-electron.js && ..."
```

`package.json`의 `postinstall` 훅에서 자동 실행됩니다.

## 포트 할당

각 앱은 독립적인 포트에서 실행됩니다:

- `web`: 5678
- `api`: 4321 (선택적, 필요 시 사용)
- `docs`: 7822
- `desktop`: 23456
- `mobile`: 8081 (Metro Bundler)

포트 충돌을 방지하기 위해 각 앱에 고유한 포트가 할당되어 있습니다.

## 백엔드 아키텍처

### 역할 분담

프로젝트는 **기본 + 확장** 구조로 백엔드를 구성합니다:

#### 기본 구조 (일반적인 경우)

```
클라이언트
    ↓         ↓
Payload CMS  Supabase
    ↓         ↓
Supabase PostgreSQL
```

- **Payload CMS**: 메인 백엔드 (CMS 기능, 자동 API)
- **Supabase**: 데이터베이스 + 인증 + 스토리지
- **NestJS**: 사용 안 함

#### 확장 구조 (커스텀 로직 필요 시)

```
클라이언트
    ↓         ↓              ↓
Payload CMS  Supabase  NestJS API
    ↓         ↓              ↓
Supabase PostgreSQL
```

- **Payload CMS**: 메인 백엔드 (기본 기능)
- **Supabase**: 데이터베이스 + 인증 + 스토리지
- **NestJS API**: 커스텀 로직만 (필요할 때만)

### 역할 분담표

| 역할          | Payload CMS       | Supabase          | NestJS API   |
| ------------- | ----------------- | ----------------- | ------------ |
| 기본 CMS 기능 | ✅                | ❌                | ❌           |
| 데이터베이스  | ✅ (직접 접근)    | ✅ (PostgreSQL)   | ❌           |
| 인증          | ✅ (Admin용)      | ✅ (프론트엔드용) | ❌           |
| 자동 API      | ✅ (REST/GraphQL) | ✅ (PostgREST)    | ❌           |
| 커스텀 로직   | ❌                | ❌                | ✅ (필요 시) |

## 패키지 관리

### pnpm 워크스페이스

`pnpm-workspace.yaml`에 정의된 워크스페이스:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 의존성 설치

- 루트에서 `pnpm install` 실행 시 모든 워크스페이스 의존성 설치
- 워크스페이스 간 의존성은 `@repo/*` 스코프로 참조

### 호이스팅 설정

`.npmrc`에서 설정:

```
shamefully-hoist=true
public-hoist-pattern[]=*esbuild*
public-hoist-pattern[]=*electron*
ignore-scripts=false
```

Electron 바이너리와 esbuild가 루트에서 접근 가능하도록 호이스팅됩니다.
