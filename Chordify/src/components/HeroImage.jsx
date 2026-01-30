import guitarplayingimg from "../assets/images/guitarplaying.png"

function HeroImage() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] p-4 sm:p-10">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${guitarplayingimg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-10 text-center">
          <h1 className="text-white font-bold text-3xl sm:text-5xl md:text-7xl">
            Buy, Learn, Play
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            Everything in one place
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-10">
            <button className="bg-[#F2A60D] text-black py-2 px-6 rounded hover:bg-yellow-500 hover:scale-105 transition-all duration-300">
              Buy a Guitar
            </button>
            <button className="bg-[#393328] text-white py-2 px-6 rounded hover:scale-105 transition-all duration-300">
              Sell your Guitar
            </button>
            <button className="bg-[#393328] text-white py-2 px-6 rounded hover:scale-105 transition-all duration-300">
              Find Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroImage;
