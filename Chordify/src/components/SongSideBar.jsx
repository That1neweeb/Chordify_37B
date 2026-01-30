export default function SongSidebar({ links }) {
  if (!links) return <div className="bg-white rounded-xl shadow p-5 space-y-4 sticky top-6"> No Links at the moment</div>;

  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4 sticky top-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
        Resources
      </h3>

      {links.youtube && (
        <a href={links.youtube} target="_blank" className="block text-blue-600 hover:underline">
          ▶ Watch on YouTube
        </a>
      )}

      {links.tutorial && (
        <a href={links.tutorial} target="_blank" className="block text-blue-600 hover:underline">
          🎸 Guitar Tutorial
        </a>
      )}

      {links.spotify && (
        <a href={links.spotify} target="_blank" className="block text-blue-600 hover:underline">
          🎧 Listen on Spotify
        </a>
      )}
    </div>
  );
}
