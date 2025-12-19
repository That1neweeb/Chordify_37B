import GuitarCard from "./GuitarCard";
import { useEffect, useState } from "react";

function Suggested() {

  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    async function fetchGuitars() {
      try {
        const response = await fetch("http://localhost:5000/guitars/suggested");
        const data = await response.json();
        setGuitars(data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    }

    fetchGuitars();
  }, []);
  
    
    return(
        <div className="mt-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Suggested for you</h2>
            <div className="grid grid-cols-4 gap-0 mt-4">
             {guitars.map(guitar => (
                <GuitarCard
                    key={guitar.id}
                    id={guitar.id}
                    image={`http://localhost:5000${guitar.image_url}`}
                    guitarName={guitar.name}                            
                    price={guitar.price}
                    page= "landing"
                />
        ))}
            </div>
        </div>
    );
}

export default Suggested;