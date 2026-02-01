import React, { useState, useEffect } from 'react';
import { analyzeText, fetchHistory, type IAnalysisResult } from './services/api';
import { AppView } from './components/AppView';

export default function AppContainer() {
  const [text, setText] = useState<string>('');
  const [history, setHistory] = useState<IAnalysisResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const PAGE_SIZE = 5;

  useEffect(() => {
    const loadInitialHistory = async () => {
      try {
        const data = await fetchHistory(0);
        setHistory(data);
        if (data.length < 5) setHasMore(false);
      } catch (err: any) {
        triggerError("Impossible de charger l'historique. Vérifiez que l'API est en ligne.");
      }
    };
    loadInitialHistory();
  }, []);

  const handleLoadMore = async (): Promise<void> => {
    const nextSkip = skip + PAGE_SIZE;
    const newData = await fetchHistory(nextSkip);
    if (newData.length < PAGE_SIZE) setHasMore(false);
    setHistory((prev) => [...prev, ...newData]);
    setSkip(nextSkip);
  };

  const handleAnalyze = async (e: React.SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const newAnalysis = await analyzeText(text);
      setText('');
      setHistory((prevHistory) => [newAnalysis, ...prevHistory]);
      setSkip((prevSkip) => prevSkip + 1);
    } catch (err: any) {
      const message = err.response
        ? `Erreur: ${err.response.data.message || "Analyse impossible"}`
        : "Le serveur est injoignable. Vérifiez votre connexion.";
      triggerError(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string): void => {
    const newSet = new Set(expandedIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setExpandedIds(newSet);
  };

  const triggerError = (msg: string): void => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <AppView
      text={text}
      setText={setText}
      history={history}
      loading={loading}
      hasMore={hasMore}
      expandedIds={expandedIds}
      handleAnalyze={handleAnalyze}
      handleLoadMore={handleLoadMore}
      toggleExpand={toggleExpand}
      error={error}
    />
  );
}