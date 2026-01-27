import { useNavigate } from "react-router-dom";

function BasicCard({ icon, title, description, type }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "chords") {
      navigate("/chords");
    } else if (type === "exercise") {
      navigate("/exercise");
    } else if (type === "strumming") {
      navigate("/strumming");
    }
  };

  return (
    <div
      onClick={handleClick}
      className=" border-4 border-black-500/100 h-[250px] w-[400px] rounded-2xl flex flex-col justify-center items-center gap-4  hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="rounded-full bg-[#4F3D18] h-[100px] w-[100px] flex items-center justify-center ">
        <img src={icon} alt={title} className="size-10" />
      </div>

      <h1 className="text-xl font-bold">{title}</h1>
      <h6 className="text-[#ABA6A6]">{description}</h6>
    </div>
  );
}

export default BasicCard;
