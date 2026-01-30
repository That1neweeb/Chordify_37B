export default function ChordLine({ lyrics, chords }) {
  let output = [];
  let lastIndex = 0;
  
  function snapToWord(lyrics, pos) {
  if (!lyrics || pos >= lyrics.length) return pos;

  // move left until we hit a space
  while (pos > 0 && lyrics[pos] !== " ") {
    pos--;
  }

  return pos;
}


    chords.forEach((c, i) => {
    const safePos = snapToWord(lyrics, c.position);

    output.push(
      <span key={`text-${i}`}>
        {lyrics.slice(lastIndex, safePos)}
      </span>
    );

    output.push(
      <span
        key={`chord-${i}`}
        className="inline-flex flex-col items-center -mt-5"
      >
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          {c.chord}
        </span>
      </span>
    );

    lastIndex = safePos;
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
