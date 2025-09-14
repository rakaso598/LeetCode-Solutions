import { getSortedProblemsData } from "@/lib/problems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";

export default function ProblemsPage() {
  const problems = getSortedProblemsData();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="page-container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">문제 목록</h1>
        <p className="text-muted-foreground text-lg mb-6">
          총 {problems.length}개의 문제가 있습니다. 난이도별로 선택하여 풀어보세요.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="문제 제목이나 태그로 검색..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">전체</Button>
            <Button variant="outline" size="sm">Easy</Button>
            <Button variant="outline" size="sm">Medium</Button>
            <Button variant="outline" size="sm">Hard</Button>
          </div>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <Card key={problem.slug} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground font-mono">
                  #{problem.slug.split('-')[0]}
                </span>
              </div>
              <CardTitle className="text-lg leading-tight">
                {problem.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/problems/${problem.slug}`}>
                    풀어보기
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {problems.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">문제가 없습니다</h3>
          <p className="text-muted-foreground">아직 추가된 문제가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
