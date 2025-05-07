
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";

interface CommentSectionProps {
  finalComment: string;
  setFinalComment: (comment: string) => void;
  onPrevious: () => void;
  onSubmit: () => void;
  translations: Record<string, Record<string, string>>;
}

export function CommentSection({
  finalComment,
  setFinalComment,
  onPrevious,
  onSubmit,
  translations
}: CommentSectionProps) {
  const { language } = useTheme();
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-900 dark:text-white">
            {translations.finalComments[language as keyof typeof translations.finalComments]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Textarea
              value={finalComment}
              onChange={(e) => setFinalComment(e.target.value)}
              placeholder={translations.commentsPlaceholder[language as keyof typeof translations.commentsPlaceholder]}
              className="min-h-[150px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            {translations.prevButton[language as keyof typeof translations.prevButton]}
          </Button>
          <Button className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white" onClick={onSubmit}>
            {translations.submitButton[language as keyof typeof translations.submitButton]}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
