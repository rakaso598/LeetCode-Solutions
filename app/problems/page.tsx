import { getSortedProblemsData } from "@/lib/problems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProblemsPage() {
  const problems = getSortedProblemsData();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
      case 'hard':
        return 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">문제 목록</h1>
        <p className="text-muted-foreground">
          총 {problems.length}개의 문제
        </p>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem: any) => (
          <Card key={problem.slug} className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border hover:border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getDifficultyColor(problem.difficulty)} variant="secondary">
                  {problem.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground font-mono bg-gray-100 px-2 py-1 rounded">
                  #{problem.slug.split('-')[0]}
                </span>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {problem.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                {problem.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {problem.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{problem.tags.length - 3}
                  </Badge>
                )}
              </div>
              <Button asChild className="w-full">
                <Link href={`/problems/${problem.slug}`}>
                  문제 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {problems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">아직 문제가 없습니다.</p>
          <p className="text-sm text-muted-foreground">스크립트를 사용해 새 문제를 추가해보세요.</p>
        </div>
      )}
    </div>
  );
}
