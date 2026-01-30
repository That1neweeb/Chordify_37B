export default function CommonCard({ img, title }) {
  return (
     <div 
      className="bg-[#27231B] rounded-2xl p-8 flex flex-col items-center gap-6 w-96 h-[500px] shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-96 object-cover rounded-2xl"
      />

      <h2 className="text-2xl font-bold text-center text-white">
        {title}
      </h2>
    </div>
  );
}
