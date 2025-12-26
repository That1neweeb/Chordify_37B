// import file from "../assets/images/file.png"
// import acoustic from "../assets/images/acoustic.png"
// import acoustic2 from "../assets/images/acoustic2.png"
// import electric from "../assets/images/electric.png"
// import electric2 from "../assets/images/electric2.png"
import { useRef } from "react"



function PhotoUpload() {

    const fileInputRef = useRef(null);

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        console.log("selected files : ", files);
        
    }

    return(
        <div className="bg-[#27231B] h-[1000px] border-4 border-[#393328] rounded-2xl mt-4 w-[90%] h-[800px] flex flex-col px-5">
            <h2 className="font-bold text-xl text-white mt-4">Upload Photos</h2>
            <h6 className="text-[#ABA6A6] mt-4">Upload up to 5 high quality photos</h6>
            <div className="bg-[#181611] w-[98%] h-[300px] mt-4 flex flex-col items-center justify-center border border-dashed border-[#ABA6A6] rounded-xl">
                <img src={file} alt="" className="size-20"/>
                <h3 className="text-[#ABA6A6] mt-4">Drag and Drop your photos here or</h3>
            </div>

            <div className="flex self-center">
                <input type="file" multiple accept="image/*" 
                ref={fileInputRef}
                style={{display: "none"}}
                onChange={handleFileChange}
                />
                <button onClick={handleBrowseClick} className="bg-[#4F3D18] rounded-3xl w-40 self-center mt-10" >
                    <h6 className="text-[#F2A60D]">Browse Files</h6>
                </button>
            </div>
         

            <div className="grid grid-cols-5 mt-10 mb-4">
                <img src={acoustic} alt="" className="h-56 w-40 object-cover object-center rounded-2xl"/>
                <img src={acoustic2} alt="" className="h-56 w-40 object-cover object-center rounded-2xl"/>
                <img src={electric} alt="" className="h-56 w-40 object-cover object-center rounded-2xl"/>
                <img src={electric2} alt="" className="h-56 w-40 object-cover object-center rounded-2xl"/>
                <img src={electric2} alt="" className="h-56 w-40 object-cover object-center rounded-2xl"/>
            </div>
        </div>
    );
}

export default PhotoUpload;