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
      examples: ['核心產品功能', '重大營收增長項目', '用戶體驗突破性改進']
    },
    {
      range: '7-9',
      level: '高',
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: '⚡',
      description: '重要功能，對業務有顯著影響',
      examples: ['重要新功能', '性能優化', '關鍵Bug修復']
    },
    {
      range: '4-6',
      level: '中',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: '📈',
      description: '一般功能，正常業務需求',
      examples: ['常規功能改進', '一般性維護', '小幅優化']
    },
    {
      range: '2-3',
      level: '低',
      color: 'bg-orange-100 text-orange-800 border-orange-300',
      icon: '📋',
      description: '次要功能，可延後處理',
      examples: ['非緊急修復', '次要改進', '文檔更新']
    },
    {
      range: '0-1',
      level: '極低',
      color: 'bg-gray-100 text-gray-800 border-gray-300',
      icon: '💤',
      description: '可選功能，優先度最低',
      examples: ['實驗性功能', '未來考慮項目', '低價值改進']
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
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {scoreRanges.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className={item.color}>
                  {item.icon} {item.level} ({item.range})
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-3">{item.description}</p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-600">範例：</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {item.examples.map((example, exIndex) => (
                    <li key={exIndex} className="flex items-start">
                      <span className="mr-1">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                價值分數計算建議
              </p>
              <p className="text-xs text-blue-800">
                評估時考慮：業務影響度 × 用戶受益面 × 實施緊急度。數字越高代表對產品價值貢獻越大。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ValueScoreSummaryCard({ 
  totalValueScore = 0, 
  averageValueScore = 0, 
  highValueIssuesCount = 0 
}: {
  totalValueScore?: number;
  averageValueScore?: number;
  highValueIssuesCount?: number;
}) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          價值分數統計
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalValueScore.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">總價值分數</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{averageValueScore.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">平均分數</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{highValueIssuesCount}</div>
            <div className="text-xs text-muted-foreground">高價值項目</div>
          </div>
        </div>
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
