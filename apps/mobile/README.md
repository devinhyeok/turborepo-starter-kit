# Mobile App (React Native)

React Native 모바일 애플리케이션입니다. Expo를 사용하여 빠르게 개발할 수 있습니다.

## 기술 스택

- React Native 0.81.5
- Expo ~54.0.23
- Expo Router ~6.0.14
- TypeScript 5.9.2

## 사전 요구사항

### 필수 도구

- Node.js 18 이상
- pnpm 9.0.0 이상
- Expo CLI (선택사항)

### 모바일 개발 환경

#### iOS 개발 (macOS만 가능)

- Xcode (App Store에서 설치)
- CocoaPods: `sudo gem install cocoapods`
- iOS Simulator (Xcode 설치 시 포함)

#### Android 개발

- Android Studio
- Android SDK
- Android Emulator 또는 실제 기기
- ADB가 PATH에 설정되어 있어야 함

## 빠른 시작

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# 웹
turbo dev --filter=mobile

# Android 에뮬레이터
turbo dev:android --filter=mobile

# iOS 시뮬레이터
turbo dev:ios --filter=mobile
```

**사전 준비:** Android Studio에서 에뮬레이터 실행 후 `adb devices`로 연결 확인

### 개발 빌드

```bash
turbo build --filter=mobile
```

### 프로덕션 빌드

```bash
# Android APK/AAB
turbo build:android --filter=mobile

# iOS IPA
turbo build:ios --filter=mobile
```

> 참고: 프로덕션 빌드는 EAS (Expo Application Services) 계정이 필요합니다.

## 프로젝트 구조

```
apps/mobile/
├── app/                    # Expo Router 파일 기반 라우팅
│   ├── (tabs)/            # 탭 네비게이션
│   └── _layout.tsx        # 루트 레이아웃
├── components/            # 재사용 가능한 컴포넌트
├── constants/             # 상수 정의
├── hooks/                 # 커스텀 훅
├── assets/                # 이미지, 폰트 등 리소스
├── app.json               # Expo 설정
└── package.json           # 패키지 의존성
```

## 추가 리소스

- [Expo 문서](https://docs.expo.dev/): 기본 개념부터 고급 주제까지
- [Expo Router 문서](https://docs.expo.dev/router/introduction/): 파일 기반 라우팅 가이드
- [React Native 문서](https://reactnative.dev/): React Native 공식 문서
- [Turborepo 문서](https://turbo.build/repo/docs): 모노레포 관리 가이드
