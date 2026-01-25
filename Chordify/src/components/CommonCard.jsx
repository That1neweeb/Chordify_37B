export default function CommonCard({img, title}){
    return(
        <div className="bg-[#27231B] rounded-2xl p-4 flex flex-col items-center gap-3">
  <img
    src={img}
    alt={title}
    className="w-full h-48 object-cover rounded-xl"
  />

  <h2 className="text-lg font-bold text-center">
    {title}
  </h2>
</div>

    );
}