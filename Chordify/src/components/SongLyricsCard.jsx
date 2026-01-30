import ChordLine from "./Chordline";

export default function LyricsCard({ song }) {
  if (!song || !song.content || !song.content.sections) return null;

  return (
    <div className="max-w-3xl mx-auto bg-black rounded-xl shadow p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1"> <span className="text-gray-400">Song Title :</span> {song.title}</h1>
      <p className="text-gray-400 mb-2 font-bold"> <span className="text-gray-400 font-semibold">Artist : </span>{song.artist}</p>
      {song.strummingPattern && (
        <p className="text-gray-600 mb-4">
          🎵 Strumming Pattern: {song.strummingPattern}
        </p>
      )}

      {/* Meta */}
      <div className="flex gap-4 text-sm text-gray-400 mb-6">
        <span>Difficulty: {song.difficulty || "Unknown"}</span>
      </div>

      {/* Lyrics Sections */}
      <div className="space-y-6">
        {song.content.sections.map((section, sIdx) => (
          <div key={sIdx}>
            {/* Section Header */}
            <p className="uppercase text-xs tracking-widest text-gray-400 mb-2 font-semibold">
              {section.type || "Verse"}
            </p>

            {/* Lines */}
            <div className="space-y-3">
              {section.lines.map((line, idx) => (
                <ChordLine
                  key={idx}
                  lyrics={line.lyrics || ""}
                  chords={line.chords || []}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
