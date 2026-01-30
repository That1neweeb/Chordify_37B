import BasicCard from "./LearnBasicCard";
import chordslibrary from "../assets/images/sliders.png";
import tabexercise from "../assets/images/sheet-music.png";
import strumming from "../assets/images/musical.png";
import { useNavigate } from "react-router-dom";

const basiccards = [
    { icon: chordslibrary, title: "Chords Library", description: "Learn some basic chords", path: "/learn/chords" },
    { icon: tabexercise, title: "Tab Exercises", description: "Learn fingerstyle", path: "/learn/exercises" },
    { icon: strumming, title: "Essential Strumming Patterns", description: "Master common strumming patterns", path: "/learn/strumming-patterns" }
];

function LearnBasics() {
    const navigate = useNavigate();

    return (
        <div className="mt-32 pb-10">
            <h2 className="font-bold text-2xl">Learn Basics</h2>
            <div className="grid grid-cols-3 mt-10 gap-6">
                {basiccards.map((basiccard, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(basiccard.path)}
                        className="cursor-pointer"
                    >
                        <BasicCard
                            icon={basiccard.icon}
                            title={basiccard.title}
                            description={basiccard.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearnBasics;
