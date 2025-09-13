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
                const mdContent = `---\ntitle: "${number}. ${title}"\ndifficulty: "${difficulty}"\ntags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]\ndate: "${today}"\n---\n\n### 🔍 풀이 과정\n_이곳에 풀이 아이디어를 기록하세요._\n\n### ⏱️ 시간 복잡도 / 📦 공간 복잡도\n- **시간 복잡도**: \n- **공간 복잡도**: \n\n### 💡 코드\n\`\`\`javascript\n// 여기에 코드를 작성하세요.\n\`\`\`
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
