import learningpage from "../assets/images/learningpage.png"    

function LearningPageHeroImage() {
    return(

        //Hero image of learning page
      <div className="relative h-[500px] w-[100%] flex items-center justify-center ">
          <div className="h-[500px] w-[65rem] bg-no-repeat bg-center bg-cover mt-40 flex items-center justify-center rounded-xl" style={{backgroundImage : `url(${learningpage})`}}>
                <h1 className="absolute text-4xl font-bold scale-y-125">Your journey to guitar mastery starts here</h1>
          </div>
      </div>
    
    );
}

export default LearningPageHeroImage