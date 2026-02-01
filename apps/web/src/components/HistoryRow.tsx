import type { IAnalysisResult } from '../services/api';
import { StatusBadge } from './StatusBadge';

interface IHistoryRowProps {
  item: IAnalysisResult,
  isExpanded: boolean,
  onToggle: () => void
}

export const HistoryRow: React.FC<IHistoryRowProps> = ({ item, isExpanded, onToggle }) => (
  <tr className="hover:bg-slate-50/50 transition-colors group align-top">
    <td className="px-4 py-4">
      <div className="flex flex-col">
        <p className={`text-sm text-slate-600 font-serif italic transition-all duration-300 ${isExpanded ? 'whitespace-normal' : 'truncate max-w-50'}`}>
          "{item.text}"
        </p>
        {item.text.length > 60 && (
          <button onClick={onToggle} className="text-[10px] text-blue-500 mt-2 font-bold uppercase tracking-widest text-left">
            {isExpanded ? 'Lire moins [-]' : 'Lire plus [+]'}
          </button>
        )}
        <p className="text-[10px] text-slate-400 mt-2 font-mono">
          {new Date(item.createdAt).toLocaleString('fr')}
        </p>
      </div>
    </td>
    <td className="px-4 py-4 text-center align-middle">
      <span className={`text-lg font-black ${item.score > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
        {item.score}<span className="text-[10px] opacity-40">/100</span>
      </span>
    </td>
    <td className="px-4 py-4 text-right align-middle">
      <StatusBadge status={item.status} />
    </td>
  </tr>
);