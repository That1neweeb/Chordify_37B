import GuitarCard from "./GuitarCard";
import electric2 from "../assets/images/electric2.png"
import electric from "../assets/images/electric.png"
import acoustic from "../assets/images/acoustic.png"
import acoustic2 from "../assets/images/acoustic2.png"




const guitars = [
    {guitarName : "Moksha", image : electric, price : "Rs. 50,000"},
    {guitarName : "Yamaha", image : electric2, price : "Rs. 40,000"},
    {guitarName : "some guitar", image : acoustic, price : "Rs. 20,000"},
    {guitarName : "another guitar", image : acoustic2, price : "Rs. 10,000"}

]

function Suggested() {
  
    
    return(
        <div className="mt-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Suggested for you</h2>
            <div className="grid grid-cols-4 gap-0 mt-4">
                {guitars.map((guitar,index) => 
                    <GuitarCard 
                        key={index}
                        guitarName={guitar.guitarName}
                        image={guitar.image}
                        price={guitar.price}
                    />
                )}
            </div>
        </div>
    );
}

export default Suggested;