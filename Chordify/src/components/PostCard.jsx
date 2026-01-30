export default function PostCard({ content }) {
  return (
    <div className="bg-[#27231B] w-full max-w-3xl rounded-3xl overflow-hidden border border-[#8B6914]/40 shadow-lg">

      {/* Video */}
      <video
        src={content.video}
        controls
        className="w-full max-h-[450px] object-cover bg-black"
      />

      {/* Content */}
      <div className="p-6 space-y-2">
        <h2 className="text-xl font-bold text-[#D4AF37]">
          {content.title}
        </h2>

        <p className="text-gray-300 text-sm">
          {content.desc}
        </p>

        <p className="text-gray-400 text-xs">
          Posted by <span className="text-[#D4AF37]">{content.user}</span>
        </p>
      </div>
    </div>
  );
}
