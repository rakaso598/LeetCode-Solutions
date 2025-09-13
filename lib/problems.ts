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
    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as { title: string; difficulty: string; tags: string[]; date: string; }),
    };
  });
  return allProblemsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
