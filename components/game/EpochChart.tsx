"use client";

type EpochPoint = {
  epoch: number;
  accuracy: number;
};

type EpochChartProps = {
  points: EpochPoint[];
};

export default function EpochChart({ points }: EpochChartProps) {
  if (!points.length) {
    return (
      <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white text-sm text-gray-500">
        Run training to render accuracy chart.
      </div>
    );
  }

  const polyline = points
    .map((point) => {
      const x = (point.epoch / Math.max(1, points[points.length - 1].epoch)) * 100;
      const y = 100 - point.accuracy;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3">
      <svg viewBox="0 0 100 100" className="h-40 w-full rounded-xl bg-slate-950/95 p-2">
        <polyline points={polyline} fill="none" stroke="#34D399" strokeWidth="2.3" />
        {points.map((point) => (
          <circle
            key={point.epoch}
            cx={(point.epoch / Math.max(1, points[points.length - 1].epoch)) * 100}
            cy={100 - point.accuracy}
            r="1.5"
            fill="#6EE7B7"
          />
        ))}
      </svg>
    </div>
  );
}
