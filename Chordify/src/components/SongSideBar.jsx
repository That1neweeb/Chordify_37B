export default function SongSidebar({ song }) {
  return (
    <div className="bg-black p-4 rounded-2xl shadow-md flex flex-col gap-4">
      <h2 className="font-bold text-lg mb-2 text-white">Song Info</h2>
      <p className="text-white"><span className="text-semibold">Artist:</span> {song.artist}</p>
      <p className="text-white"><span className="text-semibold">Difficulty:</span> {song.difficulty}</p>

      {song.links && (
        <div className="mt-4">
          <h3 className="font-semibold mb-1 text-white">Listen Online:</h3>
          <a
            href={song.links}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open Link
          </a>
        </div>
      )}
    </div>
  );
}
