"use client";

type Point = { x: number; y: number; group?: "a" | "b" | "c" };

type VisualizationPanelProps = {
  mode: "linearRegression" | "classification" | "clustering" | "neuralNetwork";
  linePoints: Point[];
  scatterPoints: Point[];
  accuracy: number;
};

const pointColor = (group?: "a" | "b" | "c") => {
  if (group === "a") return "#8B5CF6";
  if (group === "b") return "#22C55E";
  return "#3B82F6";
};

export default function VisualizationPanel({
  mode,
  linePoints,
  scatterPoints,
  accuracy,
}: VisualizationPanelProps) {
  if (mode === "linearRegression") {
    const polyline = linePoints
      .map((point) => `${(point.x / 10) * 100},${100 - (point.y / 10) * 100}`)
      .join(" ");

    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Regression Trend</h3>
          <span className="text-xs text-gray-500">R^2 approx: {(accuracy / 100).toFixed(2)}</span>
        </div>
        <svg viewBox="0 0 100 100" className="h-56 w-full rounded-xl bg-slate-950/95 p-2">
          <polyline fill="none" stroke="#8B5CF6" strokeWidth="2.2" points={polyline} />
          {linePoints.map((point, idx) => (
            <circle
              key={`${point.x}-${point.y}-${idx}`}
              cx={(point.x / 10) * 100}
              cy={100 - (point.y / 10) * 100}
              r="1.6"
              fill="#A78BFA"
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">
          {mode === "classification" ? "Classification Scatter" : mode === "clustering" ? "Cluster Formation" : "Neural Decision Space"}
        </h3>
        <span className="text-xs text-gray-500">Accuracy: {accuracy}%</span>
      </div>
      <svg viewBox="0 0 100 100" className="h-56 w-full rounded-xl bg-slate-950/95 p-2">
        {scatterPoints.map((point, idx) => (
          <circle
            key={`${point.x}-${point.y}-${idx}`}
            cx={(point.x / 10) * 100}
            cy={100 - (point.y / 10) * 100}
            r="2.2"
            fill={pointColor(point.group)}
            opacity="0.95"
          />
        ))}
      </svg>
    </div>
  );
}
