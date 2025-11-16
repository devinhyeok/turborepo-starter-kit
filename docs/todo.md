## Payload CMS 올인원 전략

### 프로젝트 개요

Turborepo 모노레포 프로젝트의 `apps/web`에 Payload CMS를 백엔드 올인원 솔루션으로 구축합니다.

### 전략 결정 (혼자 개발)

- ❌ NestJS + Drizzle: 시간 소요 3개월 (Admin UI 직접 구축)
- ✅ Payload CMS: 시간 소요 1.5주 (모든 기능 자동 생성)
- 결론: Payload 올인원 전략 채택

### 호환성 확인 결과

- Node.js 버전: v22.20.0 (요구사항: 20.9.0+) ✅
- Next.js 버전: 15+ 필요 (docs 앱: 16.0.1) ✅
- pnpm 워크스페이스: 지원 ✅
- Turborepo 구조: 호환 가능 ✅

### 구현 단계

#### 1단계: 프로젝트 설정

- [ ] `apps/web` 디렉토리에 Next.js + Payload CMS 설치
- [ ] `package.json` 의존성 설정
- [ ] Payload 설정 파일 생성

#### 2단계: 데이터베이스 설정

- [x] 데이터베이스 선택: Supabase 셀프호스팅 (PostgreSQL 포함) ✅
- [ ] Supabase Docker Compose 설정 (packages/database)
- [ ] packages/database에 공통 연결 설정
- [ ] 환경 변수 설정 (.env)
- [ ] 모든 앱에서 공유 DB 사용 가능하도록 구성

#### 3단계: Payload 설정

- [ ] Collections 정의
- [ ] Admin UI 설정
- [ ] 인증 설정

#### 4단계: Turborepo 통합

- [ ] `turbo.json`에 web 앱 태스크 추가
- [ ] 공유 패키지 설정 (types, utils 등)
- [ ] 빌드 파이프라인 구성

#### 5단계: 테스트 및 검증

- [ ] 개발 서버 실행 확인
- [ ] Admin UI 접근 확인
- [ ] API 엔드포인트 테스트
- [ ] 빌드 및 배포 테스트

#### 6단계: NestJS 확장 (선택적)

- [ ] 커스텀 로직 필요 여부 확인
- [ ] NestJS 프로젝트 생성 (`apps/api`)
- [ ] Payload/Supabase와 통합
- [ ] 커스텀 API 엔드포인트 구현

### 기술 스택 (확정)

- Framework: Next.js 15+ + Payload CMS 3.0 (올인원)
- Database: **Supabase 셀프호스팅** ✅ (PostgreSQL + Auth + Storage + Realtime)
- ORM: **Drizzle** ✅ (Payload 내장)
- API: REST + GraphQL (Payload 자동 생성)
- Admin UI: Payload 내장
- 확장: **NestJS** (선택적, 커스텀 로직용)
- Package Manager: pnpm 9.0.0
- Monorepo: Turborepo 2.6.1

### Payload가 제공하는 것

- ✅ 백엔드 API (REST + GraphQL)
- ✅ ORM (Drizzle 내장)
- ✅ Admin UI (자동 생성)
- ✅ 인증 및 권한 관리
- ✅ 파일 업로드 (DAM)
- ✅ TypeScript 타입 자동 생성
- ✅ 이미지 리사이징
- ✅ 버전 관리

### 참고 문서

- Payload CMS 공식 문서: https://payloadcms.com/docs/getting-started/what-is-payload
- Payload CMS 설치 가이드: https://payloadcms.com/docs/getting-started/installation
- Turborepo 문서: https://turbo.build/repo/docs

### 주의사항

- Next.js 15 이상 버전 필수
- `next.config.js`에 Payload 플러그인 추가 필요
- 데이터베이스 연결 정보는 환경 변수로 관리
- Turborepo 캐싱 전략 고려
- Payload가 기본 백엔드 기능 제공 (별도 ORM/API 서버 불필요)
- NestJS는 커스텀 로직이 필요할 때만 추가 (선택적)

### 시간 절약 효과

- NestJS + Drizzle + Admin UI 직접 구축: 11-13주
- Payload CMS 올인원: 1.5주
- **절약 시간: 약 10주 (2.5개월)**
