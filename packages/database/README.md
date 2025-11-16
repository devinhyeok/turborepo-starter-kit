# Database Package

Supabase CLI를 사용한 로컬 개발 환경 및 데이터베이스 연결 설정을 제공하는 공유 패키지입니다.

## 구조

Supabase CLI로 초기화하면 다음 구조가 생성됩니다:

```
packages/database/
├── database.types.ts           # Supabase DB 타입 (자동 생성)
├── supabase/
│   ├── config.toml             # Supabase 설정 (CLI가 자동 생성)
│   ├── migrations/             # 데이터베이스 마이그레이션 (필요 시 생성)
│   │   └── *.sql
│   ├── seed.sql                # 초기 데이터 (선택)
│   └── functions/              # Edge Functions (선택)
├── package.json
└── README.md
```

## 포함되는 서비스

Supabase 로컬 개발 환경에는 다음이 포함됩니다:

- PostgreSQL (데이터베이스)
- PostgREST (REST API)
- GoTrue (인증 서비스)
- Storage (파일 스토리지)
- Realtime (실시간 기능)
- Postgres-Meta (메타데이터 관리)
- Kong (API Gateway)

## 설치 및 초기 설정

### 1. Supabase CLI 설치

이 프로젝트는 pnpm을 사용하므로, Supabase CLI는 dev dependency로 설치됩니다:

```bash
# 루트에서 의존성 설치 (모든 패키지 포함)
pnpm install

# 또는 packages/database에서만 설치
cd packages/database
pnpm install
```

설치 후 `pnpm dev` 또는 `pnpm exec supabase` 명령어를 사용할 수 있습니다.

### 2. 프로젝트 초기화

```bash
cd packages/database
supabase init
```

이 명령어는 `supabase/` 디렉토리와 `config.toml` 파일을 자동으로 생성합니다.

### 3. 로컬 Supabase 시작

```bash
# package.json 스크립트 사용
pnpm dev

# 또는 직접 실행
supabase start
```

## 사용 방법

### Turborepo 명령어 (권장)

루트 디렉토리에서 Turborepo를 통해 실행합니다:

```bash
# Supabase 시작
pnpm db:dev

# 상태 확인
pnpm db:status

# 중지
pnpm db:stop

# 데이터베이스 리셋
pnpm db:reset

# TypeScript 타입 생성
pnpm db:types

# 마이그레이션
pnpm db:migration:new <name>
pnpm db:migration:up
pnpm db:migration:down
```

### 로컬 실행 (packages/database에서 직접 실행)

`packages/database` 디렉토리에서 직접 실행할 수도 있습니다:

```bash
# 시작
pnpm dev
# 또는
pnpm dlx supabase@latest start

# 중지
pnpm db:stop
# 또는
pnpm dlx supabase@latest stop

# 상태 확인
pnpm db:status
# 또는
pnpm dlx supabase@latest status

# 데이터베이스 리셋
pnpm db:reset
# 또는
pnpm dlx supabase@latest db reset

# 새 마이그레이션 생성
pnpm db:migration:new <migration_name>
# 또는
pnpm dlx supabase@latest migration new <migration_name>

# 마이그레이션 적용
pnpm db:migration:up
# 또는
pnpm dlx supabase@latest migration up

# 마이그레이션 롤백
pnpm db:migration:down
# 또는
pnpm dlx supabase@latest migration down

# TypeScript 타입 생성
pnpm db:types
# 또는
pnpm dlx supabase@latest gen types typescript --local > ../types/src/database.types.ts
```

## 환경 변수

Supabase CLI는 로컬 개발 환경에서 자동으로 환경 변수를 설정합니다.

`supabase status` 명령어로 현재 실행 중인 서비스의 연결 정보를 확인할 수 있습니다:

```bash
supabase status
```

출력 예시:

```
API URL: http://localhost:54321
GraphQL URL: http://localhost:54321/graphql/v1
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
Inbucket URL: http://localhost:54324
JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **참고**: 위의 키들은 로컬 개발 환경의 예시입니다. 실제 프로덕션 키와는 다릅니다.

## 주의사항

- Supabase CLI는 로컬 개발 환경용입니다
- 프로덕션 배포는 Supabase 공식 GitHub 저장소의 docker-compose.yml을 사용하세요
- 로컬 환경의 데이터는 `supabase stop` 후 삭제될 수 있습니다 (볼륨 설정에 따라 다름)

## 참고 자료

- [Supabase CLI 문서](https://supabase.com/docs/reference/cli)
- [로컬 개발 가이드](https://supabase.com/docs/guides/local-development)
- [Supabase 셀프호스팅 가이드](https://supabase.com/docs/guides/self-hosting)
