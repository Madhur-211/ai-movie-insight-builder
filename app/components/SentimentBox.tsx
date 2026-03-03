"use client";

import { SentimentType } from "@/types/movie";

interface SentimentBoxProps {
  summary: string;
  sentiment: SentimentType;
}

export default function SentimentBox({
  summary,
  sentiment,
}: SentimentBoxProps) {
  const sentimentConfig = {
    Positive: {
      badge:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      accent: "bg-green-500",
      icon: "😊",
    },
    Mixed: {
      badge:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      accent: "bg-yellow-500",
      icon: "😐",
    },
    Negative: {
      badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      accent: "bg-red-500",
      icon: "😕",
    },
  };

  const config = sentimentConfig[sentiment] || {
    badge: "bg-gray-100 text-gray-800",
    accent: "bg-gray-400",
    icon: "🤖",
  };

  return (
    <div
      className="relative mt-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl 
                 p-6 md:p-8 transition-all duration-300 
                 hover:shadow-2xl animate-fadeIn overflow-hidden"
    >
      {/* Accent Bar */}
      <div
        className={`absolute left-0 top-0 h-full w-2 ${config.accent} rounded-l-3xl`}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          AI Audience Sentiment
        </h3>

        <span
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full 
                      text-sm font-semibold transition-all duration-200 
                      ${config.badge}`}
        >
          {/* <span>{config.icon}</span> */}
          {sentiment}
        </span>
      </div>

      {/* Summary */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
        {summary}
      </p>
    </div>
  );
}
