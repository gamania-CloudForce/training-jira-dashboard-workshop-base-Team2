import { useState, useEffect, useCallback } from 'react';

interface IssueWithValueScore {
  key: string;
  summary: string;
  status: string;
  story_points?: number;
  value_score?: number;
  sprint?: string;
  issue_type?: string;
  priority?: string;
}

interface ValueScoreStats {
  average_score: number;
  max_score: number;
  min_score: number;
  total_issues_with_scores: number;
  score_distribution: Record<string, number>;
}

interface UseValueScoresOptions {
  sprint?: string;
  enabled?: boolean;
}

export function useValueScores(options: UseValueScoresOptions = {}) {
  const { sprint, enabled = true } = options;
  
  const [issues, setIssues] = useState<IssueWithValueScore[]>([]);
  const [stats, setStats] = useState<ValueScoreStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (sprint && sprint !== 'All') {
        params.append('sprint', sprint);
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      
      const [issuesRes, statsRes] = await Promise.all([
        fetch(`${baseUrl}/api/dashboard/issues-with-scores?${params}`),
        fetch(`${baseUrl}/api/dashboard/value-score-stats?${params}`)
      ]);

      if (!issuesRes.ok) throw new Error(`Issues API error: ${issuesRes.status}`);
      if (!statsRes.ok) throw new Error(`Stats API error: ${statsRes.status}`);

      const issuesData = await issuesRes.json();
      const statsData = await statsRes.json();

      setIssues(issuesData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching value scores:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [sprint, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sort and filter functions
  const sortIssuesByScore = useCallback((order: 'asc' | 'desc' = 'desc') => {
    setIssues(prev => [...prev].sort((a, b) => {
      const scoreA = a.value_score ?? 0;
      const scoreB = b.value_score ?? 0;
      return order === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    }));
  }, []);

  const filterIssuesByScoreRange = useCallback((min?: number, max?: number) => {
    return issues.filter(issue => {
      const score = issue.value_score ?? 0;
      if (min !== undefined && score < min) return false;
      if (max !== undefined && score > max) return false;
      return true;
    });
  }, [issues]);

  return { 
    issues, 
    stats, 
    loading, 
    error, 
    refetch: fetchData,
    sortIssuesByScore,
    filterIssuesByScoreRange
  };
}
