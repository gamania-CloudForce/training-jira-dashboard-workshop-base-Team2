"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowUpDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ValueScoreDisplay } from '@/components/value-score-display';
import { useValueScores } from '@/hooks/use-value-scores';

interface IssuesWithScoresProps {
  sprint?: string;
}

export function IssuesWithScores({ sprint }: IssuesWithScoresProps) {
  const { issues, loading, error } = useValueScores({
    sprint: sprint === 'All' ? undefined : sprint
  });
  
  const [sortBy, setSortBy] = useState<'score' | 'key' | 'status'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredAndSortedIssues = useMemo(() => {
    if (!issues) return [];
    
    // 先篩選
    let filtered = issues;
    switch (filterBy) {
      case 'high':
        filtered = issues.filter((issue: any) => (issue.value_score ?? 0) >= 8);
        break;
      case 'medium':
        filtered = issues.filter((issue: any) => (issue.value_score ?? 0) >= 5 && (issue.value_score ?? 0) < 8);
        break;
      case 'low':
        filtered = issues.filter((issue: any) => (issue.value_score ?? 0) < 5);
        break;
      default:
        filtered = issues;
    }
    
    // 再排序
    return filtered.sort((a: any, b: any) => {
      let comparison = 0;
      switch (sortBy) {
        case 'score':
          comparison = (b.value_score ?? 0) - (a.value_score ?? 0);
          break;
        case 'key':
          comparison = a.key.localeCompare(b.key);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });
  }, [issues, sortBy, sortOrder, filterBy]);

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'Done': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800', 
      'To Do': 'bg-gray-100 text-gray-800',
      'Ready to Test': 'bg-purple-100 text-purple-800',
      'Testing': 'bg-yellow-100 text-yellow-800',
      'Backlog': 'bg-slate-100 text-slate-800',
      'Evaluated': 'bg-indigo-100 text-indigo-800',
      'Waiting': 'bg-orange-100 text-orange-800',
      'PR Review': 'bg-cyan-100 text-cyan-800',
      'Dev Completed': 'bg-emerald-100 text-emerald-800',
      'Ready to Verify': 'bg-pink-100 text-pink-800',
      'Ready to Release': 'bg-teal-100 text-teal-800',
      'Invalid': 'bg-red-100 text-red-800',
      'Routine': 'bg-amber-100 text-amber-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusDescription = (status: string) => {
    const statusDescriptions: Record<string, string> = {
      'Done': '已完成 - 功能已交付使用',
      'In Progress': '開發中 - 正在進行開發',
      'To Do': '待處理 - 等待開始開發',
      'Ready to Test': '待測試 - 開發完成，等待測試',
      'Testing': '測試中 - 正在進行測試驗證',
      'Backlog': '產品待辦 - 尚未安排開發',
      'Evaluated': '已評估 - 需求已分析完成',
      'Waiting': '等待中 - 等待相依項目完成',
      'PR Review': '代碼審查 - 等待同儕審查',
      'Dev Completed': '開發完成 - 等待部署測試',
      'Ready to Verify': '待驗收 - 等待產品驗收',
      'Ready to Release': '待上線 - 準備發布到生產環境',
      'Invalid': '無效 - 不需要處理的項目',
      'Routine': '例行性 - 定期維護工作'
    };
    return statusDescriptions[status] || status;
  };

  const getPriorityColor = (priority?: string) => {
    const priorityColors: Record<string, string> = {
      'Highest': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800', 
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800',
      'Lowest': 'bg-blue-100 text-blue-800',
    };
    return priorityColors[priority || 'Medium'] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityDescription = (priority?: string) => {
    const priorityDescriptions: Record<string, string> = {
      'Highest': '最高優先 - 立即處理，阻塞其他工作',
      'High': '高優先 - 重要功能，需優先安排',
      'Medium': '中等優先 - 一般功能，正常排程',
      'Low': '低優先 - 次要功能，有空再處理',
      'Lowest': '最低優先 - 可選功能，最後考慮'
    };
    return priorityDescriptions[priority || 'Medium'] || priority || 'Medium';
  };

  const getIssueTypeDescription = (issueType?: string) => {
    const typeDescriptions: Record<string, string> = {
      'Epic': '史詩 - 大型功能集合，包含多個故事',
      'Story': '故事 - 完整的用戶功能需求',
      'Task': '任務 - 技術工作或維護項目',
      'Bug': '缺陷 - 需要修復的問題',
      'Subtask': '子任務 - 故事或任務的分解項目',
      'Feature': '功能 - 新增的產品功能',
      'Improvement': '改善 - 現有功能的優化',
      'New Feature': '新功能 - 全新的產品能力'
    };
    return typeDescriptions[issueType || 'Story'] || issueType || 'Story';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>載入 Issues 資料中...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-red-600">
            載入失敗: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* 控制列 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm text-gray-600 cursor-help">篩選:</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>依照價值分數等級篩選顯示的 Issues</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="high">高價值 (8+ 分)</SelectItem>
              <SelectItem value="medium">中價值 (5-7 分)</SelectItem>
              <SelectItem value="low">低價值 (&lt;5 分)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm text-gray-600 cursor-help">排序:</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>選擇 Issues 的排序方式</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">價值分數</SelectItem>
              <SelectItem value="key">Issue ID</SelectItem>
              <SelectItem value="status">工作狀態</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="cursor-help"
                >
                  {sortOrder === 'desc' ? '降序 ↓' : '升序 ↑'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>切換排序順序：降序 (高到低) 或升序 (低到高)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Issues 清單 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            顯示 {filteredAndSortedIssues.length} 個項目
            {sprint !== 'All' && sprint && ` (Sprint: ${sprint})`}
          </div>
          
          <div className="text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            💡 <strong>價值分數說明：</strong>
            分數越高表示該功能對業務越重要，應優先開發
          </div>
        </div>
        
        {filteredAndSortedIssues.map((issue) => (
          <Card key={issue.key} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {/* Issue Key */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-mono text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded cursor-help">
                            {issue.key}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Issue ID - 項目唯一識別碼</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Status Badge */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className={`${getStatusColor(issue.status)} cursor-help`}>
                            {issue.status}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-xs">
                            <p className="font-medium">工作狀態</p>
                            <p className="text-sm">{getStatusDescription(issue.status)}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Priority Badge */}
                    {issue.priority && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className={`${getPriorityColor(issue.priority)} cursor-help`}>
                              {issue.priority}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-medium">優先級別</p>
                              <p className="text-sm">{getPriorityDescription(issue.priority)}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {/* Issue Type Badge */}
                    {issue.issue_type && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="cursor-help">
                              {issue.issue_type}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-medium">工作類型</p>
                              <p className="text-sm">{getIssueTypeDescription(issue.issue_type)}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {/* Story Points */}
                    {issue.story_points && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded cursor-help">
                              {issue.story_points} SP
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-medium">故事點數</p>
                              <p className="text-sm">估計的開發工作量，數字越大表示越複雜或耗時</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                    {issue.summary}
                  </h3>
                  
                  {issue.sprint && (
                    <div className="text-xs text-gray-500">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">
                              Sprint: {issue.sprint}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-medium">所屬 Sprint</p>
                              <p className="text-sm">該項目被安排在此開發衝刺週期中進行</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex-shrink-0 min-w-0">
                  <ValueScoreDisplay 
                    score={issue.value_score} 
                    size="md"
                    showTooltip={true}
                    showLabel={true}
                    showFullDescription={false}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredAndSortedIssues.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center h-24">
              <div className="text-gray-500">
                沒有符合條件的 Issues
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
