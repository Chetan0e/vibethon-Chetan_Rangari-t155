export default function ProgressBar({ value, color = "bg-green-400" }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-gray-200 h-4 rounded-full mt-2 overflow-hidden">
      <div
        className={`${color} h-4 rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}
