import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSortedProblemsData } from "@/lib/problems";
import Link from "next/link";
import { ArrowRight, Trophy, Calendar } from "lucide-react";

export default function Home() {
  const recentProblems = getSortedProblemsData().slice(0, 6);

  // 실제 데이터 기반 통계 계산
  const totalProblems = recentProblems.length;
  const difficultyCount = recentProblems.reduce((acc, problem) => {
    acc[problem.difficulty.toLowerCase()] = (acc[problem.difficulty.toLowerCase()] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lastUpdateDate = recentProblems.length > 0
    ? new Date(recentProblems[0].date).toLocaleDateString('ko-KR', {
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
    <div className="page-container py-8">
      {/* Hero Section */}
      <section className="text-center py-16 mb-16 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
          LeetCode Solutions
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          코딩 테스트 준비를 위한 LeetCode 문제 해설과 솔루션을 제공합니다.<br />
          <span className="text-lg text-muted-foreground/80">체계적인 학습으로 알고리즘 실력을 향상시켜보세요.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <Link href="/problems">
              문제 풀어보기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 hover:bg-gray-50 transition-all duration-200" asChild>
            <Link href="/about">더 알아보기</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section - 실제 데이터 기반 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="h-44 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">해결된 문제</CardTitle>
            <Trophy className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{totalProblems}개</div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md">
                Easy: {difficultyCount.easy || 0}
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
                Medium: {difficultyCount.medium || 0}
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md">
                Hard: {difficultyCount.hard || 0}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="h-44 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold">최근 업데이트</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="flex flex-col justify-end h-full">
            <div className="text-2xl font-bold mb-2">{lastUpdateDate}</div>
            <p className="text-sm text-muted-foreground">새로운 문제가 추가되었습니다</p>
          </CardContent>
        </Card>
      </section>

      {/* Recent Problems Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">최근 문제</h2>
            <p className="text-muted-foreground">최근에 추가된 문제들을 확인해보세요</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/problems">
              모든 문제 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProblems.map((problem) => (
            <Card key={problem.slug} className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-200 h-64 flex flex-col border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="flex-shrink-0 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getDifficultyColor(problem.difficulty)} variant="secondary">
                    {problem.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-mono bg-gray-100 px-2 py-1 rounded">
                    #{problem.slug.split('-')[0]}
                  </span>
                </div>
                <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {problem.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {problem.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-200 hover:border-primary/50 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                  {problem.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-200">
                      +{problem.tags.length - 3}
                    </Badge>
                  )}
                </div>
                <Button asChild className="w-full mt-auto group-hover:bg-primary/90 transition-colors">
                  <Link href={`/problems/${problem.slug}`}>
                    문제 풀기
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
