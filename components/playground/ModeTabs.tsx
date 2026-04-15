"use client";

type PlaygroundMode = "linearRegression" | "classification" | "clustering" | "neuralNetwork";

type ModeMeta = {
  id: PlaygroundMode;
  label: string;
};

type ModeTabsProps = {
  modes: ModeMeta[];
  activeMode: PlaygroundMode;
  onChange: (mode: PlaygroundMode) => void;
};

export default function ModeTabs({ modes, activeMode, onChange }: ModeTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            activeMode === mode.id
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
              : "bg-white/80 text-gray-700 hover:bg-purple-50"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
