import guitarplayingimg from "../assets/images/guitarplaying.png"

function HeroImage() {
    return(

        <div className="relative w-[74rem] h-[600px] p-10 px-20">

            {/* Background Image */}
            <div className="absolute h-[600px] w-[74rem] bg-center bg-cover bg-no-repeat mt-10"
            style={{backgroundImage: `url(${guitarplayingimg})`}}
            >

                {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-10">
                <h1 className="text-white font-bold text-7xl">Buy, Learn, Play</h1>
                <p className="mt-2">Everything in one place</p>

                <div className="flex gap-14 mt-10">
                    <button className="bg-[#F2A60D] text-black hover:bg-yellow-500 hover:scale-105 transition-all duration-300">Buy a Guitar</button>
                    <button className="bg-[#393328] hover:scale-105 transition-all duration-300">Sell your Guitar</button>
                    <button className="bg-[#393328] hover:scale-105 transition-all duration-300">Find lesson</button>
                </div>
            </div>
       </div>
        </div>
    
      
    );
}
export default HeroImage;