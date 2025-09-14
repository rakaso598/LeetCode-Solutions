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
    <div className="mx-auto max-w-4xl px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            홈으로
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
              <CardTitle className="text-2xl font-bold">
                {problemData.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                <Clock className="inline-block mr-1 h-4 w-4" />
                {problemData.date}
              </span>
              <a href={problemData.leetcode_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                원문
              </a>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </CardContent>
      </Card>

      {/* Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        {problemData.tags.map((tag: string) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <Separator className="my-8" />
    </div>
  );
}
