## LeetCode 포트폴리오 프로젝트 구성 문서

### 1\. 프로젝트 개요

이 문서는 LeetCode 문제 풀이 기록을 체계적으로 정리하여 개인 포트폴리오 웹사이트로 제작하기 위한 전체적인 가이드라인을 제공합니다. Next.js, Vercel, 그리고 GitHub를 활용하며, 별도의 데이터베이스 없이 파일 시스템을 기반으로 효율적인 개발 워크플로우를 구축하는 것을 목표로 합니다. 이 문서는 AI 에이전트 간의 협업을 염두에 두고 작성되었으며, 각 단계는 명확하고 구조화되어 있습니다.

### 2\. 기술 스택

  - **프레임워크**: Next.js (React 기반의 서버 사이드 렌더링/정적 사이트 생성 프레임워크)
  - **배포**: Vercel (Next.js에 최적화된 호스팅 플랫폼)
  - **버전 관리**: Git & GitHub
  - **마크다운 파서**: `gray-matter`, `remark` (마크다운 파일을 데이터로 변환)
  - **코드 하이라이터**: `react-syntax-highlighter` (코드 블록을 보기 좋게 표시)
  - **자동화**: Node.js 스크립트 (파일 및 템플릿 자동 생성)

-----

### 3\. 레포지토리 및 폴더 구조

프로젝트의 핵심은 데이터와 애플리케이션 로직을 명확하게 분리하는 것입니다. 다음 구조는 **베스트 프랙티스**를 반영한 것입니다.

```
/
├── .gitignore
├── package.json
├── next.config.js
├── README.md
├── app/              # Next.js App Router (UI 로직)
│   ├── layout.tsx
│   ├── page.tsx      # 메인 페이지 (문제 목록)
│   └── problems/[slug]/  # 동적 라우팅 페이지 (문제 상세 페이지)
│       └── page.tsx
├── components/       # 재사용 가능한 UI 컴포넌트
│   └── ProblemCard.tsx
├── content/          # 문제 풀이 데이터 (핵심 데이터 레이어)
│   └── problems/
│       ├── 1-two-sum/
│       │   ├── README.md
│       │   └── solution.js
│       └── 2-add-two-numbers/
│           ├── README.md
│           └── solution.js
├── lib/              # 데이터 처리 로직 및 유틸리티
│   ├── problems.ts   # 문제 데이터 읽기 및 가공 함수
│   └── markdown.ts   # 마크다운 파싱 함수
├── scripts/          # 자동화 스크립트
│   └── create-problem.js
└── data/             # 스크립트가 생성하는 요약 데이터
    └── problems.json
```

-----

### 4\. 핵심 데이터 구조 및 마크다운 템플릿

모든 문제 풀이는 `content/problems/[문제명]/README.md` 파일에 기록됩니다. 이 파일의 상단에는 `frontmatter`를 사용하여 메타데이터를 정의합니다.

#### `README.md` 파일 예시 (`content/problems/1-two-sum/README.md`)

````markdown
---
title: "1. Two Sum"
difficulty: "Easy"
tags: ["Array", "Hash Table"]
date: "2025-09-13"
---

### 🔍 풀이 과정
_이곳에 문제 해결을 위한 사고의 흐름과 알고리즘 접근 방식을 상세히 설명합니다._
예시: 해시맵(Hash Map)을 사용하여 $O(n)$의 시간 복잡도로 해결할 수 있습니다. 배열을 한 번 순회하면서...

### ⏱️ 시간 복잡도 / 📦 공간 복잡도
- **시간 복잡도**: $O(n)$
- **공간 복잡도**: $O(n)$

### 💡 코드
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};
````

````

---

### 5. 자동화 스크립트 (`scripts/create-problem.js`)
이 스크립트는 새로운 문제 풀이 폴더와 템플릿 파일을 자동으로 생성하여 수동 작업을 최소화합니다.

#### **스크립트 동작 방식**
1.  **입력 받기**: `node scripts/create-problem.js` 명령어를 실행하면, 사용자에게 **문제 번호, 제목, 난이도, 태그**를 입력받습니다.
2.  **폴더명 생성**: 입력받은 정보를 바탕으로 슬러그(slug)를 생성합니다. (예: `1`, `Two Sum` -> `1-two-sum`)
3.  **디렉터리 생성**: `content/problems/[슬러그]` 경로에 새로운 디렉터리를 생성합니다.
4.  **파일 생성**: 위에서 정의한 마크다운 템플릿을 사용하여 `README.md` 파일을 생성하고, 빈 코드 파일(`solution.js`)도 함께 생성합니다.

#### **스크립트 코드 (예시)**
```javascript
// scripts/create-problem.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getSlug = (number, title) => {
    return `${number}-${title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim()}`;
};

rl.question('문제 번호를 입력하세요: ', (number) => {
    rl.question('문제 제목을 입력하세요: ', (title) => {
        rl.question('난이도를 입력하세요 (Easy, Medium, Hard): ', (difficulty) => {
            rl.question('태그를 입력하세요 (쉼표로 구분): ', (tags) => {
                const slug = getSlug(number, title);
                const dirPath = path.join(__dirname, '..', 'content', 'problems', slug);
                const today = new Date().toISOString().split('T')[0];
                
                // 마크다운 템플릿
                const mdContent = `---
title: "${number}. ${title}"
difficulty: "${difficulty}"
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
date: "${today}"
---

### 🔍 풀이 과정
_이곳에 풀이 아이디어를 기록하세요._

### ⏱️ 시간 복잡도 / 📦 공간 복잡도
- **시간 복잡도**: 
- **공간 복잡도**: 

### 💡 코드
\`\`\`javascript
// 여기에 코드를 작성하세요.
\`\`\`
`;

                fs.mkdirSync(dirPath, { recursive: true });
                fs.writeFileSync(path.join(dirPath, 'README.md'), mdContent);
                fs.writeFileSync(path.join(dirPath, 'solution.js'), '');

                console.log(`✅ "${title}" 문제 폴더와 파일이 생성되었습니다: ${dirPath}`);
                rl.close();
            });
        });
    });
});
````

-----

### 6\. Next.js 데이터 처리 및 렌더링 로직

Next.js는 파일 시스템을 활용하여 정적 웹사이트를 생성합니다.

#### `lib/problems.ts` (데이터 불러오기)

```javascript
// lib/problems.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'problems');

export function getSortedProblemsData() {
    const fileNames = fs.readdirSync(contentDir);
    const allProblemsData = fileNames.map(fileName => {
        const slug = fileName;
        const fullPath = path.join(contentDir, fileName, 'README.md');
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray-matter로 frontmatter 파싱
        const matterResult = matter(fileContents);

        return {
            slug,
            ...(matterResult.data as { title: string; difficulty: string; tags: string[]; date: string; }),
        };
    });

    // 날짜별로 정렬
    return allProblemsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}
```

-----

#### `app/page.tsx` (메인 페이지)

`getSortedProblemsData` 함수를 사용하여 문제 목록을 불러와 렌더링합니다.

```tsx
// app/page.tsx
import { getSortedProblemsData } from '../lib/problems';
import Link from 'next/link';

export default function Home() {
    const allProblemsData = getSortedProblemsData();

    return (
        <main>
            <h1>LeetCode Solutions</h1>
            <p>풀이한 알고리즘 문제들을 정리한 포트폴리오입니다.</p>
            <ul>
                {allProblemsData.map(({ slug, title, difficulty, tags }) => (
                    <li key={slug}>
                        <Link href={`/problems/${slug}`}>
                            <h3>{title}</h3>
                            <p>난이도: {difficulty}</p>
                            <p>태그: {tags.join(', ')}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
```

-----

### 7\. Vercel 배포 및 CI/CD

1.  **Vercel 계정 생성 및 GitHub 연동**: Vercel에 가입하고, GitHub 계정과 연결합니다.
2.  **프로젝트 임포트**: Vercel 대시보드에서 **New Project**를 클릭하고, 이 레포지토리를 선택합니다.
3.  **자동 배포**: Vercel은 레포지토리를 감지하여 자동으로 빌드 및 배포 설정을 완료합니다. 이후, `main` 브랜치에 푸시할 때마다 새로운 커밋이 감지되어 웹사이트가 자동으로 업데이트됩니다.

이 문서의 구조를 따라가면, LeetCode 문제 풀이 포트폴리오를 성공적으로 구축할 수 있을 것입니다.