# LeetCode Solutions Portfolio

Next.js 기반의 개인 알고리즘 풀이 포트폴리오입니다. 문제 풀이를 체계적으로 기록하고, 웹사이트로 관리할 수 있습니다.

## 주요 기능
- 마크다운 기반 문제 풀이 데이터 관리
- 문제 목록 및 상세 풀이 페이지 자동 생성
- 자동화 스크립트로 문제 폴더/파일 생성
- Vercel을 통한 손쉬운 배포

## 빠른 시작
1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
3. 브라우저에서 확인: http://localhost:3000

## 문제 풀이 추가
- 자동화 스크립트 실행
  ```bash
  node scripts/create-problem.js
  ```
- 안내에 따라 정보 입력 → 문제 폴더/파일 자동 생성
- README.md에 풀이 작성, solution.js에 코드 추가

## 배포
- GitHub에 코드 푸시 후 Vercel에 연결하면 자동 배포

## 목적
- 알고리즘 문제 풀이를 체계적으로 기록하고, 포트폴리오로 활용
- 파일 기반 관리로 간편한 확장 및 유지보수

## 참고
- 주요 라이브러리 설명: `docs/dependencies.md`
- 상세 사용법: `docs/usage.md`
