import { getProblemData, getAllProblemSlugs } from "@/lib/problems";
import { markdownToHtml } from "@/lib/markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Clock, BarChart3 } from "lucide-react";

interface ProblemPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const problems = getAllProblemSlugs();
  return problems.map(({ params }) => ({ slug: params.slug }));
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const problemData = getProblemData(params.slug);
  const contentHtml = await markdownToHtml(problemData.content);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="page-container py-8 max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/problems">
            <ArrowLeft className="mr-2 h-4 w-4" />
            문제 목록으로
          </Link>
        </Button>
      </div>

      {/* Problem Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getDifficultyColor(problemData.difficulty)}>
                  {problemData.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground font-mono">
                  #{problemData.slug.split('-')[0]}
                </span>
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                {problemData.title}
              </CardTitle>
            </div>

            {problemData.leetcode_url && (
              <Button asChild>
                <Link href={problemData.leetcode_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  LeetCode에서 풀기
                </Link>
              </Button>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex flex-wrap gap-2">
            {problemData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Problem Content */}
      <Card>
        <CardContent className="p-6">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              복잡도 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              시간 복잡도와 공간 복잡도를 확인하여 효율적인 솔루션을 이해해보세요.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              관련 문제
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              비슷한 유형의 문제들을 더 풀어보며 실력을 향상시켜보세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
