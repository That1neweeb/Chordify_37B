export default function Chord({ chord }) {
  return (
    <div className="bg-[#27231B] w-[400px] m-4 p-4 rounded-2xl shadow-lg  flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">
      <h2 className="text-xl font-semibold text-white mb-3">
        {chord.name}
      </h2>

      <img
        src={`http://localhost:5000${chord.image}`}
        alt="unable to load image"
        className="w-full object-contain"
      />
    </div>
  );
}
