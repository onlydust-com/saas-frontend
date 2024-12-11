"use client";

import { useState } from "react";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import type { MatchingQuestionsState } from "./matching-questions.types";

export function useMatchingQuestions() {
  // const { data: matchingQuestions, isLoading } = RecoReactQueryAdapter.client.useGetMatchingQuestions({
  //   queryParams: {
  //     v: "REPLACE_WITH_ALGO_ID",
  //   },
  // });

  const isLoading = false;

  const matchingQuestions = {
    questions: [
      {
        id: "b98a375e-3a9d-4b63-a553-4d8d0c31d7c4",
        body: "What are your primary goals for contributing to open-source projects?",
        description:
          "Your goals help us understand what motivates you and find projects that align with your aspirations.",
        multipleChoice: true,
        answers: [
          {
            index: 0,
            body: "Learning new skills",
            chosen: true,
          },
          {
            index: 1,
            body: "Building a professional network",
            chosen: true,
          },
          {
            index: 2,
            body: "Gaining practical experience",
            chosen: false,
          },
          {
            index: 3,
            body: "Supporting meaningful projects",
            chosen: false,
          },
          {
            index: 4,
            body: "Earning recognition in the community",
            chosen: false,
          },
        ],
      },
      {
        id: "2e44c33e-2c29-4f72-8d03-55aa1b83e3f1",
        body: "Do you prefer contributing to projects that align with your current skills, challenge you to learn new ones, or both?",
        description: "This helps us understand your learning preferences and comfort zone.",
        multipleChoice: false,
        answers: [
          {
            index: 0,
            body: "Align with my skills",
            chosen: false,
          },
          {
            index: 1,
            body: "Challenge me to learn",
            chosen: false,
          },
          {
            index: 2,
            body: "Both",
            chosen: false,
          },
        ],
      },
      {
        id: "4f52195c-1c13-4c54-9132-a89e73e4c69d",
        body: "How would you rate your experience in software development?",
        description: "This helps us recommend projects matching your experience level.",
        multipleChoice: false,
        answers: [
          {
            index: 0,
            body: "Beginner",
            chosen: false,
          },
          {
            index: 1,
            body: "Intermediate",
            chosen: false,
          },
          {
            index: 2,
            body: "Advanced",
            chosen: false,
          },
          {
            index: 3,
            body: "Expert",
            chosen: false,
          },
        ],
      },
      {
        id: "7d052a24-7824-43d8-8e7b-3727c2c1c9b4",
        body: "Which programming languages are you proficient in or interested in using?",
        description: "Select the languages you'd like to work with in open source projects.",
        multipleChoice: true,
        answers: [
          {
            index: 0,
            body: "C#",
            chosen: false,
          },
          {
            index: 1,
            body: "Rust",
            chosen: false,
          },
          {
            index: 2,
            body: "Cairo",
            chosen: false,
          },
          {
            index: 3,
            body: "Noir",
            chosen: false,
          },
          {
            index: 4,
            body: "Javascript",
            chosen: false,
          },
          {
            index: 5,
            body: "Python",
            chosen: false,
          },
          {
            index: 6,
            body: "Go",
            chosen: false,
          },
          {
            index: 7,
            body: "Zig",
            chosen: false,
          },
          {
            index: 8,
            body: "Java",
            chosen: false,
          },
          {
            index: 9,
            body: "Ruby",
            chosen: false,
          },
          {
            index: 10,
            body: "Kotlin",
            chosen: false,
          },
          {
            index: 11,
            body: "Solidity",
            chosen: false,
          },
          {
            index: 12,
            body: "Swift",
            chosen: false,
          },
          {
            index: 13,
            body: "Typescript",
            chosen: false,
          },
          {
            index: 14,
            body: "C++",
            chosen: false,
          },
        ],
      },
      {
        id: "e9e8e9b4-3c1a-4c54-9c3e-44c9b2c1c9b4",
        body: "Which blockchain ecosystems are you interested in or curious about?",
        description: "This helps us match you with projects in your preferred blockchain ecosystems.",
        multipleChoice: true,
        answers: [
          {
            index: 0,
            body: "Optimism",
            chosen: false,
          },
          {
            index: 1,
            body: "Starknet",
            chosen: false,
          },
          {
            index: 2,
            body: "NEAR",
            chosen: false,
          },
          {
            index: 3,
            body: "Aptos",
            chosen: false,
          },
          {
            index: 4,
            body: "Zama",
            chosen: false,
          },
          {
            index: 5,
            body: "BSV Blockchain",
            chosen: false,
          },
          {
            index: 6,
            body: "Avail",
            chosen: false,
          },
          {
            index: 7,
            body: "Aztec",
            chosen: false,
          },
          {
            index: 8,
            body: "Ethereum",
            chosen: false,
          },
          {
            index: 9,
            body: "Lava",
            chosen: false,
          },
          {
            index: 10,
            body: "Don't know",
            chosen: false,
          },
        ],
      },
      {
        id: "f1c2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        body: "Do you prefer working on well-established projects or emerging ones with room for innovation?",
        description: "Your preference helps us recommend projects at the right stage of development.",
        multipleChoice: false,
        answers: [
          {
            index: 0,
            body: "Well-established projects",
            chosen: false,
          },
          {
            index: 1,
            body: "Emerging projects",
            chosen: false,
          },
          {
            index: 2,
            body: "No preference",
            chosen: false,
          },
        ],
      },
      {
        id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        body: "How important is an active community around an open-source project for you?",
        description: "This helps us understand how much you value community interaction.",
        multipleChoice: false,
        answers: [
          {
            index: 0,
            body: "Very important",
            chosen: false,
          },
          {
            index: 1,
            body: "Somewhat important",
            chosen: false,
          },
          {
            index: 2,
            body: "Not important",
            chosen: false,
          },
        ],
      },
      {
        id: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        body: "How important is long-term project involvement to you?",
        description: "This helps us understand your preferred engagement duration.",
        multipleChoice: false,
        answers: [
          {
            index: 0,
            body: "Very important",
            chosen: false,
          },
          {
            index: 1,
            body: "Somewhat important",
            chosen: false,
          },
          {
            index: 2,
            body: "Not important",
            chosen: false,
          },
        ],
      },
    ],
  };

  const [state, setState] = useState<MatchingQuestionsState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
  });

  const currentQuestion = matchingQuestions?.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === (matchingQuestions?.questions.length ?? 0) - 1;
  const isFirstQuestion = state.currentQuestionIndex === 0;

  const handleNext = () => {
    if (!isLastQuestion) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const handleAnswerSelection = (answerIndex: string) => {
    setState(prev => {
      const currentAnswers = prev.selectedAnswers[prev.currentQuestionIndex] || [];

      return {
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [prev.currentQuestionIndex]: currentQuestion?.multipleChoice
            ? currentAnswers.includes(answerIndex)
              ? currentAnswers.filter(index => index !== answerIndex)
              : [...currentAnswers, answerIndex]
            : [answerIndex],
        },
      };
    });
  };

  return {
    isLoading,
    currentQuestion,
    selectedAnswers: state.selectedAnswers[state.currentQuestionIndex] || [],
    isLastQuestion,
    isFirstQuestion,
    handleNext,
    handleBack,
    handleAnswerSelection,
  };
}
