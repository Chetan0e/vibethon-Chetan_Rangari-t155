type LearningInfoBoxProps = {
  title: string;
  description: string;
};

export default function LearningInfoBox({ title, description }: LearningInfoBoxProps) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">What you are learning</p>
      <h4 className="mt-1 text-sm font-semibold text-blue-900">{title}</h4>
      <p className="mt-1 text-sm text-blue-800">{description}</p>
    </div>
  );
}
