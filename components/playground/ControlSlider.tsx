"use client";

type ControlSliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
};

export default function ControlSlider({
  label,
  min,
  max,
  step = 1,
  value,
  unit = "",
  onChange,
}: ControlSliderProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white/70 p-3">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="rounded-full bg-purple-100 px-2 py-0.5 font-semibold text-purple-700">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </div>
  );
}
