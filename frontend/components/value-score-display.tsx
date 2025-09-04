"use client";

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ValueScoreDisplayProps {
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

export function ValueScoreDisplay({ 
  score, 
  size = 'md', 
  showTooltip = true, 
  className = '' 
}: ValueScoreDisplayProps) {
  if (!score && score !== 0) {
    return (
      <span className={`text-gray-400 text-sm ${className}`}>
        -
      </span>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-700 bg-green-100 border-green-200';
    if (score >= 5) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    if (score >= 1) return 'text-red-700 bg-red-100 border-red-200';
    return 'text-gray-700 bg-gray-100 border-gray-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return '高價值項目';
    if (score >= 5) return '中等價值項目';
    if (score >= 1) return '低價值項目';
    return '未評分項目';
  };

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const scoreElement = (
    <span 
      className={`
        inline-flex items-center rounded-full font-medium border
        ${getScoreColor(score)} 
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {score.toFixed(1)}
    </span>
  );

  if (!showTooltip) return scoreElement;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {scoreElement}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">價值分數: {score.toFixed(1)}</p>
            <p className="text-xs text-gray-600 mt-1">
              {getScoreLabel(score)}
            </p>
            <div className="text-xs text-gray-500 mt-1">
              <p>評分標準:</p>
              <p>• 8-10: 高價值項目</p>
              <p>• 5-7: 中等價值項目</p>
              <p>• 1-4: 低價值項目</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ValueScoreStatsProps {
  stats: {
    average_score: number;
    max_score: number;
    min_score: number;
    total_issues_with_scores: number;
    score_distribution: Record<string, number>;
  } | null;
  loading?: boolean;
  className?: string;
}

export function ValueScoreStats({ stats, loading, className = '' }: ValueScoreStatsProps) {
  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    );
  }

  if (!stats || stats.total_issues_with_scores === 0) {
    return (
      <div className={`text-gray-500 text-sm ${className}`}>
        <p>尚無價值分數資料</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">平均分數</p>
          <p className="text-lg font-bold">{stats.average_score.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">已評分項目</p>
          <p className="text-lg font-bold">{stats.total_issues_with_scores}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(stats.score_distribution).map(([range, count]) => (
          <div key={range} className="flex justify-between">
            <span className="text-gray-600">{range}:</span>
            <span className="font-medium">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
