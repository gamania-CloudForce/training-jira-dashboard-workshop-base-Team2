"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { ValueScoreDisplay } from './value-score-display';
import { useValueScores } from '@/hooks/use-value-scores';

interface IssuesWithScoresProps {
  sprint?: string;
  className?: string;
}

export function IssuesWithScores({ sprint, className = '' }: IssuesWithScoresProps) {
  const { issues, loading, error, sortIssuesByScore, filterIssuesByScoreRange } = useValueScores({ sprint });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [scoreFilter, setScoreFilter] = useState<string>('all');

  const handleSort = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newOrder);
    sortIssuesByScore(newOrder);
  };

  const getFilteredIssues = () => {
    switch (scoreFilter) {
      case 'high':
        return filterIssuesByScoreRange(8, 10);
      case 'medium':
        return filterIssuesByScoreRange(5, 7);
      case 'low':
        return filterIssuesByScoreRange(1, 4);
      case 'no-score':
        return issues.filter(issue => !issue.value_score || issue.value_score === 0);
      default:
        return issues;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'to do':
        return 'bg-gray-100 text-gray-800';
      case 'backlog':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'highest':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'lowest':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-3 border rounded">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>載入 Issues 失敗: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredIssues = getFilteredIssues();

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Issues 價值分數</CardTitle>
            <CardDescription>
              顯示 {filteredIssues.length} 個項目 {sprint && sprint !== 'All' ? `(Sprint: ${sprint})` : ''}
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={scoreFilter} onValueChange={setScoreFilter}>
              <SelectTrigger className="w-36">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="high">高分 (8-10)</SelectItem>
                <SelectItem value="medium">中分 (5-7)</SelectItem>
                <SelectItem value="low">低分 (1-4)</SelectItem>
                <SelectItem value="no-score">未評分</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSort}
              className="flex items-center gap-2"
            >
              {sortOrder === null && <ArrowUpDown className="w-4 h-4" />}
              {sortOrder === 'desc' && <ArrowDown className="w-4 h-4" />}
              {sortOrder === 'asc' && <ArrowUp className="w-4 h-4" />}
              排序
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredIssues.map((issue) => (
            <div 
              key={issue.key} 
              className="flex items-center gap-4 p-3 border rounded hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {issue.key}
                </code>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {issue.summary}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </Badge>
                  
                  {issue.issue_type && (
                    <Badge variant="outline" className="text-xs">
                      {issue.issue_type}
                    </Badge>
                  )}
                  
                  {issue.priority && (
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </Badge>
                  )}
                  
                  {issue.story_points && (
                    <span className="text-xs text-gray-500">
                      {issue.story_points} SP
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <ValueScoreDisplay score={issue.value_score} size="sm" />
              </div>
            </div>
          ))}
          
          {filteredIssues.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>沒有符合條件的 Issues</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
