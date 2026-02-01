import React from 'react';
import { AlertCircle, History, Plus, Zap } from 'lucide-react';
import { type IAnalysisResult } from '../services/api';
import { HistoryRow } from './HistoryRow';

interface IAppViewProps {
  text: string;
  setText: (val: string) => void;
  history: IAnalysisResult[];
  loading: boolean;
  hasMore: boolean;
  expandedIds: Set<string>;
  handleAnalyze: (e: React.SubmitEvent) => void;
  handleLoadMore: () => void;
  toggleExpand: (id: string) => void;
  error: string | null;
}

export const AppView: React.FC<IAppViewProps> = ({
  text, setText, history, loading, hasMore, expandedIds,
  handleAnalyze, handleLoadMore, toggleExpand, error
}) => {
  return (
    <div className="w-11/12 mx-auto mt-10">

      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <AlertCircle size={20} className="text-red-500" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-x-6 items-start">
        {/* Formulaire d'analyse */}
        <div className="w-7/12 sticky top-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap size={18} className="text-amber-400" /> Exécuter une nouvelle analyse
            </h2>
            <form onSubmit={handleAnalyze} className="mt-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-48 p-4 w-full bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                placeholder="Entrer le texte à évaluer..."
              />
              <button
                type="submit"
                disabled={loading || text.length === 0}
                className="w-full mt-4 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-blue-700 disabled:bg-slate-300 transition-all shadow-lg shadow-blue-200"
              >
                {loading ? 'Traitement en cours...' : 'Lancer la vérification'}
              </button>
            </form>
          </div>
        </div>

        {/* Historique */}
        <div className="w-5/12 flex flex-col h-[calc(100vh-300px)]">
          <div className="mb-3">
            <h2 className="text-xl font-bold flex items-center gap-x-2">
              <History className="text-blue-600" /> Résultats récents
            </h2>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
            {history.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                <div className="bg-slate-50 p-6 rounded-full mb-4">
                  <History size={48} className="text-slate-300 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Aucun historique disponible</h3>
              </div>
            ) : (
              <>
                <div className="overflow-y-auto custom-scrollbar flex-1">
                  <table className="w-full text-left border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm shadow-sm">
                      <tr className="text-slate-500 uppercase text-[10px] font-bold">
                        <th className="px-6 py-4 border-b border-slate-100">Texte</th>
                        <th className="px-6 py-4 border-b border-slate-100 text-center">Score</th>
                        <th className="px-6 py-4 border-b border-slate-100 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {history.map((item) => (
                        <HistoryRow
                          key={item.id}
                          item={item}
                          isExpanded={expandedIds.has(item.id)}
                          onToggle={() => toggleExpand(item.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                {hasMore && (
                  <button onClick={handleLoadMore} className="sticky bottom-0 bg-white w-full py-4 text-blue-600 text-xs font-bold uppercase tracking-widest border-t border-slate-100">
                    <Plus size={14} className="inline mr-1" /> Voir plus
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};