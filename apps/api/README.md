## API Server (NestJS)

NestJS 기반 커스텀 API 서버입니다. **선택적**으로 사용하며, Payload CMS로 처리하기 어려운 복잡한 비즈니스 로직을 담당합니다.

## 기술 스택

- NestJS 11.0.1
- TypeScript 5.7.3
- Scalar API Reference (API 문서화)
- Express (HTTP 서버)

## 사전 요구사항

- Node.js 18 이상
- pnpm 9.0.0 이상

## 빠른 시작

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# Turborepo를 통한 실행 (권장)
turbo dev --filter=api

# 또는 직접 실행
cd apps/api
pnpm dev
```

서버가 실행되면 `http://localhost:4321`에서 접근할 수 있습니다.

### API 문서

- API 문서: http://localhost:4321/docs
- 루트 접속 시 자동으로 문서로 리다이렉트됩니다.

### 프로덕션 빌드

```bash
# 빌드
turbo build --filter=api

# 프로덕션 서버 실행
turbo start --filter=api
```

## 사용 시나리오

이 NestJS API는 다음 경우에 사용합니다:

- 복잡한 비즈니스 로직
- 외부 서비스 통합 (결제, 이메일 등)
- 배치 작업/스케줄링
- 특수한 데이터 처리
- Payload로 처리하기 어려운 기능

## 사용하지 않는 경우

다음 경우에는 NestJS를 사용하지 않습니다:

- 일반적인 CRUD 작업 (Payload로 충분)
- 인증/권한 관리 (Supabase/Payload로 충분)
- 파일 업로드 (Payload DAM으로 충분)
- 단순한 API 엔드포인트 (Payload 자동 생성)

## 프로젝트 구조

```
apps/api/
├── src/
│   ├── app.controller.ts      # 기본 컨트롤러
│   ├── app.module.ts          # 루트 모듈
│   ├── app.service.ts         # 기본 서비스
│   ├── main.ts                 # 애플리케이션 진입점
│   ├── calculator/             # 계산기 예제 모듈
│   │   └── calculator.controller.ts
│   └── modules/                # 기능별 모듈 (추가 예정)
├── test/                       # E2E 테스트
├── favicon.svg                 # 파비콘
└── package.json
```

## API 엔드포인트 예제

### 기본 엔드포인트

- `GET /api/hello`: Hello World 메시지 반환

### 계산기 API

- `GET /calculator`: 두 숫자와 연산자로 계산
  - Query Parameters: `a` (숫자), `b` (숫자), `operator` (+, -, \*, /)
- `GET /calculator/add`: 덧셈
- `GET /calculator/multiply`: 곱셈

**예시:**

```bash
# 덧셈
curl "http://localhost:4321/calculator/add?a=10&b=5"

# 곱셈
curl "http://localhost:4321/calculator/multiply?a=10&b=5"

# 일반 계산
curl "http://localhost:4321/calculator?a=10&b=5&operator=+"
```

## 환경 변수

현재는 기본 포트(4321)를 사용합니다. 포트를 변경하려면:

```env
PORT=4321
```

또는 `src/main.ts`에서 직접 수정할 수 있습니다.

## 테스트

```bash
# 단위 테스트
pnpm test

# E2E 테스트
pnpm test:e2e

# 테스트 커버리지
pnpm test:cov
```

## 추가 리소스

- [NestJS 문서](https://docs.nestjs.com): NestJS 공식 문서
- [Scalar API Reference](https://scalar.com): API 문서화 도구
- [Turborepo 문서](https://turbo.build/repo/docs): 모노레포 관리 가이드

## 주의사항

- 이 API는 **선택적**입니다. Payload CMS로 충분한 경우 사용하지 않아도 됩니다.
- 커스텀 로직이 필요할 때만 이 API를 확장하세요.
- 기본 CRUD 작업은 Payload CMS를 사용하는 것이 더 효율적입니다.
