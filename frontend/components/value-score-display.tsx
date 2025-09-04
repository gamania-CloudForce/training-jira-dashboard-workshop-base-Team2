"use client";

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ValueScoreDisplayProps {
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  showLabel?: boolean;
  showFullDescription?: boolean;
  className?: string;
}

export function ValueScoreDisplay({ 
  score, 
  size = 'md', 
  showTooltip = true, 
  showLabel = true,
  showFullDescription = false,
  className = '' 
}: ValueScoreDisplayProps) {
  if (!score && score !== 0) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className="text-gray-400 text-sm bg-gray-100 px-2 py-1 rounded-full">
          未評分
        </span>
        {showFullDescription && (
          <span className="text-xs text-gray-500">
            尚未進行價值評估
          </span>
        )}
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 10) return 'text-emerald-800 bg-emerald-100 border-emerald-300';
    if (score >= 8) return 'text-green-800 bg-green-100 border-green-300';
    if (score >= 5) return 'text-yellow-800 bg-yellow-100 border-yellow-300';
    if (score >= 3) return 'text-orange-800 bg-orange-100 border-orange-300';
    if (score >= 1) return 'text-red-800 bg-red-100 border-red-300';
    return 'text-gray-800 bg-gray-100 border-gray-300';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 10) return '極高';
    if (score >= 8) return '高';
    if (score >= 5) return '中';
    if (score >= 3) return '低';
    if (score >= 1) return '極低';
    return '未評';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 10) return '戰略級功能，業務影響極大';
    if (score >= 8) return '重要功能，明顯業務價值';
    if (score >= 5) return '一般功能，適中業務價值';
    if (score >= 3) return '次要功能，有限業務價值';
    if (score >= 1) return '可選功能，業務價值微小';
    return '未評分項目';
  };

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const scoreElement = (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span 
        className={`
          inline-flex items-center gap-1 rounded-full font-medium border
          ${getScoreColor(score)} 
          ${sizeClasses[size]}
        `}
      >
        <span className="font-bold">{score.toFixed(1)}</span>
        {showLabel && (
          <span className="text-xs opacity-80 font-medium">
            {getScoreLevel(score)}
          </span>
        )}
      </span>
      
      {showFullDescription && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            {getScoreLevel(score)}價值功能
          </span>
          <span className="text-xs text-gray-500 max-w-xs">
            {getScoreLabel(score)}
          </span>
        </div>
      )}
    </div>
  );

  if (!showTooltip) return scoreElement;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {scoreElement}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="text-sm space-y-2">
            <div className="font-medium">
              價值分數: {score.toFixed(1)} ({getScoreLevel(score)}價值)
            </div>
            <div className="text-xs text-gray-600">
              {getScoreLabel(score)}
            </div>
            <div className="text-xs text-gray-500 border-t pt-2">
              <p className="font-medium mb-1">評分標準:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span>10+ 極高價值 (戰略級)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>8-9 高價值 (重要)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>5-7 中等價值 (一般)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>3-4 低價值 (次要)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>&lt;3 極低價值 (可選)</span>
                </div>
              </div>
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
