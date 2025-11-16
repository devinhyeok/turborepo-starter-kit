## Web App (Next.js + Payload CMS)

Next.js와 Payload CMS를 사용한 웹 애플리케이션입니다. 헤드리스 CMS와 프론트엔드를 통합한 풀스택 웹사이트 템플릿입니다.

## 기술 스택

- Next.js 15.4.7
- Payload CMS 3.64.0
- React 19.1.0
- TypeScript 5.7.3
- SQLite (기본 데이터베이스)

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
turbo dev --filter=web

# 또는 직접 실행
cd apps/web
pnpm dev
```

서버가 실행되면 `http://localhost:5678`에서 접근할 수 있습니다.

### 프로덕션 빌드

```bash
# 빌드
turbo build --filter=web

# 프로덕션 서버 실행
turbo start --filter=web
```

## 초기 세팅

### 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Database connection string
DATABASE_URI=file:./payload.db

# Used to encrypt JWT tokens
PAYLOAD_SECRET=your-secret-key-here

# Used to configure CORS, format links and more. No trailing slash
NEXT_PUBLIC_SERVER_URL=http://localhost:5678

# Secret used to authenticate cron jobs
CRON_SECRET=your-cron-secret-here

# Used to validate preview requests
PREVIEW_SECRET=your-preview-secret-here
```

**시크릿 키 생성 방법:**

```bash
# Node.js로 랜덤 시크릿 키 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

각 시크릿 키(`PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`)에 대해 위 명령어를 실행하여 고유한 값을 생성합니다.

### 데이터베이스 생성

개발 서버를 처음 실행하면 `payload.db` 파일이 자동으로 생성됩니다. 별도의 명령어는 필요하지 않습니다.

- `payload.db` 파일이 없으면: 자동으로 새로운 빈 데이터베이스 생성
- `payload.db` 파일이 있으면: 기존 데이터베이스 사용
- 데이터베이스를 초기화하려면: `payload.db` 파일을 삭제한 후 개발 서버를 다시 실행

## 프로젝트 구조

```
apps/web/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (frontend)/    # 프론트엔드 페이지
│   │   └── (payload)/     # Payload CMS 관리자
│   ├── collections/        # Payload 컬렉션 정의
│   ├── components/         # React 컴포넌트
│   └── payload.config.ts   # Payload CMS 설정
├── public/                 # 정적 파일
├── payload.db              # SQLite 데이터베이스
└── .env                    # 환경 변수
```

## 추가 리소스

- [Payload CMS 문서](https://payloadcms.com/docs): Payload CMS 공식 문서
- [Next.js 문서](https://nextjs.org/docs): Next.js 공식 문서
- [Turborepo 문서](https://turbo.build/repo/docs): 모노레포 관리 가이드
