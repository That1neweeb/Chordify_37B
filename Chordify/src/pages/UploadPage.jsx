import VideoUpload from "../components/VideoUpload";
import { useState } from "react";
import axios from "axios";
import { apiRequest } from "../hooks/useAPI";


export default function UploadPage() {

const [video_URL, setVideo] = useState();
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");


//handling submit
const handleSubmit = async() => {
    const formData = new FormData();

    formData.append("video_URL", video_URL);
    formData.append("title", title);
    formData.append("desc", desc);

    const {callApi} = apiRequest();

    try {
        const res = await callApi("POST","/posts/uploadVideo",{data : formData})
        console.log("Product added : ", res.data);
        
    } catch(e) {
        console.error("Error uploading Video:", e.response?.data || e.message);
        window.alert("Error uploading video");
    }

}

    return(
        <div className="h-full flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-3xl text-white ">Upload Video</h1>       
                <VideoUpload video_URL={video_URL} setVideo={setVideo}/>  
                <div className="bg-[#27231B] w-[90%] h-[300px] border-4 border-[#393328] rounded-3xl flex flex-col justify-center items-center gap-4">
                    <label htmlFor="title" className="mt-2">Title</label>
                    <input name="title" 
                        type="text" placeholder="Title"
                        className="h-10 rounded-xl bg-[#181611] border-4 border-[#393328] mt-4"
                        onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="description" className="">Description</label>
                    <textarea name="description"    
                         placeholder="Description"
                         className="h-40 w-[80%] rounded-xl bg-[#181611] border-4 border-[#393328] my-5"
                         onChange={(e) => setDesc(e.target.value)}></textarea>

                </div>

                <button
                onClick={handleSubmit}
                className="w-l bg-[#4F3D18] text-[#F2A60D] px-6 py-2 rounded-2xl mt-10"
                >submit Posts</button>
        </div>
    );
}
