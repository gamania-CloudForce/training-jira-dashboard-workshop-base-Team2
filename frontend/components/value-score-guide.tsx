"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp, AlertCircle } from 'lucide-react';

export function ValueScoreGuide() {
  const scoreRanges = [
    {
      range: '10+',
      level: '極高',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: '🎯',
      description: '戰略級功能，業務影響極大',
      examples: '核心商業功能、用戶增長關鍵功能'
    },
    {
      range: '8-9',
      level: '高',
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: '⭐',
      description: '重要功能，明顯業務價值',
      examples: '主要用戶體驗改善、營收相關功能'
    },
    {
      range: '5-7',
      level: '中',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: '📈',
      description: '一般功能，適中業務價值',
      examples: '功能優化、次要用戶需求'
    },
    {
      range: '3-4',
      level: '低',
      color: 'bg-orange-100 text-orange-800 border-orange-300',
      icon: '📋',
      description: '次要功能，有限業務價值',
      examples: '內部工具、技術債務修復'
    },
    {
      range: '<3',
      level: '極低',
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: '🔧',
      description: '可選功能，業務價值微小',
      examples: '實驗性功能、邊緣用例'
    }
  ];

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg text-blue-900">價值分數評估指南</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-blue-800 mb-4">
            <p className="mb-2">
              <strong>價值分數</strong>用來衡量每個功能對業務的重要程度，幫助團隊優先處理高價值項目。
            </p>
            <p>
              分數越高表示該功能越重要，應該優先開發。分數基於商業影響、用戶價值、營收潛力等因素綜合評估。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {scoreRanges.map((item) => (
              <div key={item.range} className="flex items-start gap-3 p-3 rounded-lg border bg-white">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${item.color} font-medium`} variant="outline">
                      {item.range} 分 - {item.level}價值
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    例如：{item.examples}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 mb-1">
                如何使用這些分數：
              </p>
              <ul className="text-amber-700 space-y-1 text-xs">
                <li>• <strong>極高/高價值 (8+)</strong>：優先開發，快速交付</li>
                <li>• <strong>中等價值 (5-7)</strong>：安排在 Sprint 計劃中，評估投入成本</li>
                <li>• <strong>低/極低價值 (&lt;5)</strong>：延後處理，或重新評估需求</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ValueScoreSummaryCard({ stats }: { stats: any }) {
  if (!stats) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">平均價值分數</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {stats.average_score?.toFixed(1) || '0.0'}
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>已評分: {stats.total_issues_with_scores || 0}</span>
          <span>最高: {stats.max_score?.toFixed(1) || '0.0'}</span>
          <span>最低: {stats.min_score?.toFixed(1) || '0.0'}</span>
        </div>
        {stats.score_distribution && (
          <div className="mt-3 space-y-1">
            {Object.entries(stats.score_distribution).map(([range, count]: [string, any]) => (
              <div key={range} className="flex justify-between text-xs">
                <span className="text-gray-600">{range}:</span>
                <span className="font-medium">{count} 項</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TagsGuide() {
  return (
    <Card className="mb-4 border-amber-200 bg-amber-50/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-amber-600" />
          <CardTitle className="text-base text-amber-900">標籤說明指南</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div>
            <h4 className="font-medium text-amber-800 mb-2">🏷️ 工作狀態</h4>
            <div className="space-y-1 text-xs text-amber-700">
              <p><strong>Done</strong> - 已完成交付</p>
              <p><strong>In Progress</strong> - 開發中</p>
              <p><strong>To Do</strong> - 待開始開發</p>
              <p><strong>Ready to Test</strong> - 待測試</p>
              <p><strong>Backlog</strong> - 產品待辦</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-amber-800 mb-2">⚡ 優先級別</h4>
            <div className="space-y-1 text-xs text-amber-700">
              <p><strong>Highest</strong> - 最高優先，立即處理</p>
              <p><strong>High</strong> - 高優先，重要功能</p>
              <p><strong>Medium</strong> - 中等優先，正常排程</p>
              <p><strong>Low</strong> - 低優先，有空再處理</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-amber-800 mb-2">📋 工作類型</h4>
            <div className="space-y-1 text-xs text-amber-700">
              <p><strong>Epic</strong> - 大型功能集合</p>
              <p><strong>Story</strong> - 完整用戶功能</p>
              <p><strong>Task</strong> - 技術工作項目</p>
              <p><strong>Bug</strong> - 需要修復的問題</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-amber-800 mb-2">📊 其他標籤</h4>
            <div className="space-y-1 text-xs text-amber-700">
              <p><strong>SP (Story Points)</strong> - 工作量估算</p>
              <p><strong>Sprint</strong> - 所屬開發週期</p>
              <p><strong>Issue ID</strong> - 項目唯一識別碼</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg">
          <p className="text-xs text-amber-800">
            💡 <strong>提示：</strong>將滑鼠懸停在任何標籤上，可以看到更詳細的說明。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
