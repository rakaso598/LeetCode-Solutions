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

const DIFFICULTY_MAP = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard'
};

rl.question('문제 번호를 입력하세요: ', (number) => {
    rl.question('문제 제목을 입력하세요: ', (title) => {
        console.log('난이도를 선택하세요:');
        console.log('  1) Easy');
        console.log('  2) Medium');
        console.log('  3) Hard');
        rl.question('번호를 입력하세요 (1/2/3): ', (difficultyNum) => {
            const difficulty = DIFFICULTY_MAP[difficultyNum] || 'Easy';
            rl.question('태그를 입력하세요 (쉼표로 구분, 선택사항): ', (tags) => {
                const slug = getSlug(number, title);
                const dirPath = path.join(__dirname, '..', 'content', 'problems', slug);
                const today = new Date().toISOString().split('T')[0];
                const mdContent = `---\ntitle: "${number}. ${title}"\ndifficulty: "${difficulty}"\ntags: [${tags ? tags.split(',').map(tag => `"${tag.trim()}"`).join(', ') : ''}]\ndate: "${today}"\n---\n\n### 📄 문제 설명\n_여기에 실제 문제 내용을 복사해서 넣으세요._\n\n### 🔍 풀이 과정\n_풀이 아이디어를 기록하세요._\n\n### ⏱️ 시간 복잡도 / 📦 공간 복잡도\n- **시간 복잡도**: \n- **공간 복잡도**: \n`;
                fs.mkdirSync(dirPath, { recursive: true });
                fs.writeFileSync(path.join(dirPath, 'README.md'), mdContent);
                fs.writeFileSync(path.join(dirPath, 'solution.js'), '');
                console.log(`✅ "${title}" 문제 폴더와 파일이 생성되었습니다: ${dirPath}`);
                rl.close();
            });
        });
    });
});
