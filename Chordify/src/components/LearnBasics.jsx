import BasicCard from "./LearnBasicCard";
import chordslibrary from "../assets/images/sliders.png";
import tabexercise from "../assets/images/sheet-music.png";
import strumming from "../assets/images/musical.png";   

const basiccards = [
    {icon : chordslibrary , title: "Chords Library", description : "Learn some basic chords", type : "chords"},
    {icon : tabexercise, title: "Tab exercises", description : "Learn fingerstyle", type : "exercise"},
    {icon : strumming, title: "Essential Strumming Patterns", description : "Master common strumming patterns", type : "strumming"}
] 
function LearnBasics() {

    return(
        <div className="mt-32 pb-10">
            <h2 className="font-bold text-2xl">Learn Basics</h2>
            <div className="grid grid-cols-3 mt-10">
                {basiccards.map((basiccard,index)=>
                    <BasicCard
                        key={index}
                        icon={basiccard.icon}
                        title={basiccard.title}
                        description={basiccard.description}
                        type={basiccard.type}
                    />
                 )}  
            </div>
        </div>
    );
}

export default LearnBasics;