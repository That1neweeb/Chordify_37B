function BasicCard({ icon, title, description }) {
  return (
    <div className="
      bg-[#27231B] 
      rounded-2xl 
      flex flex-col justify-center items-center gap-4 
      hover:bg-[#2B271E] hover:scale-105 transition-all duration-300 
      cursor-pointer
      w-full sm:w-[250px] md:w-[300px] lg:w-[400px]
      h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px]
      p-4
    ">
      {/* Icon */}
      <div className="rounded-full bg-[#4F3D18] flex items-center justify-center 
        h-[70px] w-[70px] sm:h-[80px] sm:w-[80px] md:h-[90px] md:w-[90px] lg:h-[100px] lg:w-[100px]
      ">
        <img src={icon} alt={title} className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 object-contain" />
      </div>

      {/* Title */}
      <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl font-bold text-center">
        {title}
      </h1>

      {/* Description */}
      <h6 className="text-[#ABA6A6] text-center text-sm sm:text-sm md:text-base lg:text-base px-2">
        {description}
      </h6>
    </div>
  );
}

export default BasicCard;
