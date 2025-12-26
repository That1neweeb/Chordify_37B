import LearnBasicCard from "./LearnBasicCard";
import chordslibrary from "../assets/images/sliders.png"
import strumming from "../assets/images/musical.png"
import tabexercise from "../assets/images/musical.png"


    const basiccards = [
        {icon : chordslibrary , title: "Chords Library", description : "Learn some basic chords"},
        {icon : tabexercise, title: "Tab exercises", description : "Learn fingerstyle"},
        {icon : strumming, title: "Essential Strumming Patterns", description : "Master common strumming patterns"}
    ] 

function LearningSection() {
    return(
        <div className="learning-section mt-40 ml-10 flex items-center gap-40">

      
                   {basiccards.map((basiccard,index)=>
                    <LearnBasicCard
                        key={index}
                        icon={basiccard.icon}
                        title={basiccard.title}
                        description={basiccard.description}
                        page = "landing"
                    />
                 )}  
            
        </div>
        
    );
}

export default LearningSection;