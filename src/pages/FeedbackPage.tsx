
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useTheme } from "@/contexts/ThemeContext";
import { QuestionsCard } from "@/components/feedback/QuestionsCard";
import { CommentSection } from "@/components/feedback/CommentSection";
import { ThankYouScreen } from "@/components/feedback/ThankYouScreen";
import { feedbackTranslations } from "@/components/feedback/translations";

export default function FeedbackPage() {
  const { selectedDepartments, getQuestionsByDepartments, addResponse } = useFeedback();
  const { language } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [finalComment, setFinalComment] = useState("");
  const [showCommentSection, setShowCommentSection] = useState(false);

  if (!selectedDepartments.length) {
    navigate("/departments");
    return null;
  }

  const allQuestions = getQuestionsByDepartments(selectedDepartments.map(d => d.id));

  const groupedQuestions = Object.values(
    allQuestions.reduce((acc, question) => {
      const key = `${question.departmentId}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(question);
      return acc;
    }, {} as Record<string, typeof allQuestions>)
  );

  const currentGroup = groupedQuestions[currentGroupIndex];

  const handleNext = () => {
    if (currentGroupIndex < groupedQuestions.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    } else {
      // If we've gone through all departments, show the comment section
      setShowCommentSection(true);
    }
  };

  const handlePrevious = () => {
    if (showCommentSection) {
      setShowCommentSection(false);
      setCurrentGroupIndex(groupedQuestions.length - 1);
    } else if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    if (!showCommentSection) {
      const unanswered = allQuestions.filter(q => !answers[q.id] && answers[q.id] !== 0);
      if (unanswered.length > 0) {
        toast({ 
          title: "Please answer all questions", 
          description: "Some questions are unanswered.", 
          variant: "destructive" 
        });
        const firstUnanswered = groupedQuestions.findIndex(group => 
          group.some(q => q.id === unanswered[0].id));
        setCurrentGroupIndex(firstUnanswered);
        return;
      }
      
      // Show the comment section after all questions are answered
      setShowCommentSection(true);
      return;
    }

    // Submit all answers including the final comment
    allQuestions.forEach((q) => {
      addResponse({ 
        questionId: q.id, 
        departmentId: q.departmentId, 
        answer: answers[q.id] 
      });
    });
    
    // Add the final comment as a special response
    if (finalComment.trim()) {
      addResponse({ 
        questionId: "final-comment", 
        departmentId: "all", 
        answer: finalComment 
      });
    }

    toast({
      title: feedbackTranslations.thankYou[language],
      description: feedbackTranslations.helpImprove[language],
    });
    setSubmitted(true);
  };

  if (submitted) {
    return <ThankYouScreen translations={feedbackTranslations} />;
  }

  // Render comment section if all department questions are answered
  if (showCommentSection) {
    return (
      <CommentSection
        finalComment={finalComment}
        setFinalComment={setFinalComment}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        translations={feedbackTranslations}
      />
    );
  }

  return (
    <QuestionsCard
      title={feedbackTranslations.title[language]}
      questions={currentGroup}
      answers={answers}
      onAnswerChange={handleAnswerChange}
      onPrevious={currentGroupIndex === 0 ? null : handlePrevious}
      onNext={currentGroupIndex === groupedQuestions.length - 1 ? handleSubmit : handleNext}
      isLastGroup={currentGroupIndex === groupedQuestions.length - 1}
      translations={feedbackTranslations}
    />
  );
}
