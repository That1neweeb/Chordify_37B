import heart from "../assets/images/heart.png"
import addtoplaylist from "../assets/images/addtoplaylist.png"
import chatbubble from "../assets/images/chat-bubble.png"
// import radiohead from "../assets/images/radiohead.jpeg"
// import heart from "../assets/images/heart.png"
// import addtoplaylist from "../assets/images/addtoplaylist.png"
// import chatbubble from "../assets/images/chat-bubble.png"



function SongCard({cover_image, song_name, artist, id }) {
    return(
        <div className="song-card bg-[#27231B] w-[350px] h-[500px] rounded-2xl flex flex-col items-center justify-around">
            <img src={cover_image} alt=""  className="rounded-2xl mt-6 w-60"/>
            <h2 className="font-bold">{song_name}</h2>
            <h6 className="text-[#B7B3B3] text-sm">{artist}</h6>
            <div className="buttons bg-[#393328] rounded-2xl h-12 w-[90%] ml-2 mr-2 flex gap-4 items-center justify-center">
                <button className="h-10 w-80 flex items-center justify-center bg-transparent"><img src={heart} alt="" className="h-8 w-8"/></button>
                <button className="h-10 w-80 flex items-center justify-center bg-transparent"><img src={addtoplaylist} alt="" className="h-8 w-8"/></button>
                <button className="h-10 w-80 flex items-center justify-center bg-transparent"><img src={chatbubble} alt="" className="h-8 w-8" /></button>
            </div>
        </div>
    );
}

export default SongCard;