# 프로젝트 사용법

이 문서는 LeetCode 포트폴리오 프로젝트의 기본 사용법을 안내합니다.

---

## 1. 설치 및 실행

1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
3. 브라우저에서 접속
   - 기본 주소: http://localhost:3000

---

## 2. 문제 풀이 데이터 추가

1. 자동화 스크립트 실행
   ```bash
   node scripts/create-problem.js
   ```
2. 안내에 따라 문제 번호, 제목, 난이도, 태그 입력
3. `content/problems/[슬러그]/README.md`와 `solution.js` 파일이 자동 생성됨
4. README.md에 풀이 내용을 작성하고, solution.js에 코드를 추가

---

## 3. 문제 목록 및 상세 페이지 확인

- 메인 페이지에서 풀이한 문제 목록을 확인할 수 있습니다.
- 각 문제를 클릭하면 상세 풀이 페이지로 이동합니다.

---

## 4. 배포

1. GitHub에 코드 푸시
2. Vercel에 프로젝트 연결 및 자동 배포

---

## 5. 기타

- 디자인 커스터마이즈: `globals.css` 또는 각 컴포넌트에서 스타일을 자유롭게 수정 가능
- 주요 라이브러리 설명: `docs/dependencies.md` 참고
