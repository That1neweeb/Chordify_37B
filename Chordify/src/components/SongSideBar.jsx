export default function SongSidebar({song}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4 sticky top-6">
      
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Resources
      </h3>

      <a
        href={song.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 hover:underline text-sm"
      >
        ▶ Watch on YouTube
      </a>

    </div>
  );
}
