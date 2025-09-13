import { getSortedProblemsData } from '../../../lib/problems';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from '../../../lib/markdown';

export default async function ProblemPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const fullPath = path.join(process.cwd(), 'content', 'problems', slug, 'README.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);

  return (
    <main>
      <h1>{data.title}</h1>
      <p>난이도: {data.difficulty}</p>
      <p>태그: {data.tags.join(', ')}</p>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </main>
  );
}
