export default function ChordLine({ content }) {
  if (!content) return <>No content at the moment</>;

  // Parse JSON if content is a string
  const parsed = typeof content === "string" ? JSON.parse(content) : content;

  const lyrics = parsed.lyrics || "";
  const chords = Array.isArray(parsed.chords) ? parsed.chords : [];

  if (!lyrics) return null;

  // Split lyrics into words
  const words = lyrics.split(" ");

  return (
    <div className="whitespace-pre-wrap text-lg leading-7">
      <div className="flex flex-wrap gap-2 mb-1">
        {words.map((word, idx) => (
          <span key={idx} className="flex flex-col items-center">
            {/* show chord above word if available */}
            {chords[idx] && (
              <span className="text-xs font-semibold text-gray-700">{chords[idx]}</span>
            )}
            <span>{word}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
