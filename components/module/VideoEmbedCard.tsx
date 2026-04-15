type VideoEmbedCardProps = {
  title: string;
  description: string;
  embedUrl: string;
};

export default function VideoEmbedCard({ title, description, embedUrl }: VideoEmbedCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="space-y-1.5 p-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </article>
  );
}
