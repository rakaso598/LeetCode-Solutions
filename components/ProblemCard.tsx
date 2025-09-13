import React from 'react';
import Link from 'next/link';

interface ProblemCardProps {
  slug: string;
  title: string;
  difficulty: string;
  tags: string[];
}

const ProblemCard: React.FC<ProblemCardProps> = ({ slug, title, difficulty, tags }) => (
  <div className="problem-card">
    <Link href={`/problems/${slug}`}>
      <h3>{title}</h3>
      <p>난이도: {difficulty}</p>
      <p>태그: {tags.join(', ')}</p>
    </Link>
  </div>
);

export default ProblemCard;
