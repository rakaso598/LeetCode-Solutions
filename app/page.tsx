import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSortedProblemsData } from "@/lib/problems";
import Link from "next/link";
import { ArrowRight, Trophy, Calendar } from "lucide-react";

// 문제 데이터 타입 정의
interface Problem {
  slug: string;
  title: string;
  difficulty: string;
  date: string;
  tags: string[];
}

export default function Home() {
  const allProblems: Problem[] = getSortedProblemsData();

  // 실제 데이터 기반 통계 계산
  const totalProblems = allProblems.length;
  const difficultyCount = allProblems.reduce((acc: Record<string, number>, problem: Problem) => {
    acc[problem.difficulty.toLowerCase()] = (acc[problem.difficulty.toLowerCase()] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 가장 최근 날짜 찾기
  const lastUpdateDate = allProblems.length > 0
    ? new Date(Math.max(...allProblems.map(p => new Date(p.date).getTime()))).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : '데이터 없음';

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
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">LeetCode Solutions</h1>
        {/* <p className="text-muted-foreground">해결한 문제 목록</p> */}
      </section>

      {/* Stats Section - 실제 데이터 기반 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">해결된 문제</CardTitle>
            <Trophy className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{totalProblems}개</div>
            <div className="flex gap-2 text-sm">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md">
                Easy / {difficultyCount.easy || 0}
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
                Medium / {difficultyCount.medium || 0}
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md">
                Hard / {difficultyCount.hard || 0}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">최근 업데이트</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{lastUpdateDate}</div>
            <p className="text-sm text-muted-foreground">마지막 문제 추가일</p>
          </CardContent>
        </Card>
      </section>

      {/* Problems Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">문제 목록</h2>
          <span className="text-sm text-muted-foreground">{totalProblems}개의 문제</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProblems.map((problem: Problem) => (
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
                  {problem.tags.slice(0, 2).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {problem.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{problem.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/${problem.slug}`}>
                    문제 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {allProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">아직 문제가 없습니다.</p>
            <p className="text-sm text-muted-foreground">스크립트를 사용해 새 문제를 추가해보세요.</p>
          </div>
        )}
      </section>
    </div>
  );
}
