export default function Chord({chord}){
    return(
        <div className="bg-[#27231B] w-[400px] m-4 p-4 rounded-2xl flex flex-col flex-wrap items-center justify-center"> 
            <h2>{chord.name}</h2>
            <img src={chord.image} alt="unable to load image"></img>
        </div>
    )
}