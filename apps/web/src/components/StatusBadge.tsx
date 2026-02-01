interface IStatusBadgeProps {
  status: string
}

export const StatusBadge: React.FC<IStatusBadgeProps> = ({ status }) => {
  const isOk = status === 'ok';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isOk ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
      {status.toUpperCase()}
    </span>
  );
};