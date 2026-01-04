import ChordLine from "./Chordline";

export default function LyricsCard({ song }) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">{song.title}</h1>
      <p className="text-gray-600 mb-4">{song.artist}</p>

      {/* Meta */}
      <div className="flex gap-4 text-sm text-gray-500 mb-6">
        <span>Difficulty: {song.difficulty}</span>
      </div>

      {/* Lyrics */}
      <div className="space-y-6">
        {song.content.sections.map((section, sIdx) => (
          <div key={sIdx}>
            <p className="uppercase text-xs tracking-widest text-gray-400 mb-2">
              {section.type}
            </p>

            <div className="space-y-3">
              {section.lines.map((line, idx) => (
                <ChordLine
                  key={idx}
                  lyrics={line.lyrics}
                  chords={line.chords}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
