export default function ChordLine({ lyrics, chords }) {
  let output = [];
  let lastIndex = 0;

  chords.forEach((c, i) => {
    output.push(
      <span key={`text-${i}`}>
        {lyrics.slice(lastIndex, c.position)}
      </span>
    );

    output.push(
      <span
        key={`chord-${i}`}
        className="inline-flex flex-col items-center -mt-5"
      >
        <span className="text-xs font-semibold text-gray-700">
          {c.chord}
        </span>
      </span>
    );

    lastIndex = c.position;
  });

  output.push(
    <span key="end">{lyrics.slice(lastIndex)}</span>
  );

  return (
    <div className="whitespace-pre-wrap text-lg leading-7">
      {output}
    </div>
  );
}
