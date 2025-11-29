function GuitarCard({guitarName, image, price}) {
    return(
        <div className="bg-[#27231B] h-[420px] w-[260px] flex flex-col rounded-2xl">
            <img src={image} alt={guitarName} className="rounded-2xl"/>
            <h3 className="ml-2">{guitarName}</h3>
            <p className="ml-2">{price}</p>
            <button className=" bg-[#393328] w-70 py-2 rounded-2xl mt-4 mx-2 mb-2">View details</button>
        </div>
    );
}

export default GuitarCard