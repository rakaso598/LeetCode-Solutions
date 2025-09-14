import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSortedProblemsData } from "@/lib/problems";
import Link from "next/link";
import {
  Code2,
  Target,
  BookOpen,
  Zap,
  Trophy,
  Github
} from "lucide-react";

export default function AboutPage() {
  const problems = getSortedProblemsData();

  const features = [
    {
      icon: Code2,
      title: "체계적인 솔루션",
      description: "각 문제마다 상세한 해설과 최적화된 코드 솔루션을 제공합니다."
    },
    {
      icon: Target,
      title: "난이도별 분류",
      description: "Easy, Medium, Hard로 나누어 단계적으로 학습할 수 있습니다."
    },
    {
      icon: BookOpen,
      title: "상세한 설명",
      description: "알고리즘의 원리와 시간/공간 복잡도 분석을 포함합니다."
    },
    {
      icon: Zap,
      title: "빠른 검색",
      description: "문제 제목, 태그, 난이도로 원하는 문제를 빠르게 찾을 수 있습니다."
    }
  ];

  const technologies = [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Markdown"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          LeetCode Solutions에 대해
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          코딩 테스트 준비를 위한 체계적이고 효율적인 학습 플랫폼입니다.
          알고리즘 문제 해결 능력을 향상시키고 싶은 개발자들을 위해 만들어졌습니다.
        </p>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">주요 특징</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats - 실제 데이터 기반 */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">프로젝트 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{problems.length}</div>
                <p className="text-muted-foreground">해결된 문제</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">TypeScript 기반</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technologies */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">사용 기술</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Mission */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              우리의 미션
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              모든 개발자가 알고리즘 문제를 체계적으로 학습하고,
              코딩 테스트에서 자신감을 가질 수 있도록 돕는 것입니다.
              단순히 정답을 제공하는 것이 아니라, 문제 해결 과정과
              사고 방식을 함께 공유합니다.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Contact & Links */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6">함께 해요</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/problems">
              <BookOpen className="mr-2 h-5 w-5" />
              문제 풀어보기
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
