import HeroImage from "../components/HeroImage";
import LearnBasics from "../components/LearnBasics";
import Suggested from "../components/Suggested";

function Home() {
    return(
        <div className="ml-20">
            <HeroImage/>
            <Suggested/>
            <LearnBasics/>
        </div>
    );
}

export default Home;