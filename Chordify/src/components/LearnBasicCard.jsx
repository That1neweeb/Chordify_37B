function BasicCard({icon, title, description}) {
    return(
        <div className="bg-[#27231B] h-[250px] w-[400px] rounded-2xl flex flex-col justify-center items-center gap-4 hover:bg-[#2B271E] hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="rounded-full bg-[#4F3D18] h-[100px] w-[100px] flex items-center justify-center">
                <img src={icon} alt={title} className="size-10" />
                </div>
            <h1 className="text-xl font-bold">{title}</h1>
            <h6 className="text-[#ABA6A6]">{description}</h6>
        </div>
    );
}

export default BasicCard;