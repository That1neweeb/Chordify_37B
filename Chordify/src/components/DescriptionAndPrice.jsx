

function DescriptionAndPrice() {
    return (
        <div className="bg-[#27231B] h-[600px] border-4 border-[#393328] rounded-2xl mt-4 w-[90%] flex flex-col px-5">
            <h1 className="font-bold text-2xl text-white mt-8 ml-10">Description & Price</h1>
            <div className="mt-4 ml-10 flex flex-col ">
               <label htmlFor="description" className="ml-8">Description</label> <br />
               <textarea name="description" id="" className="h-40 w-full rounded-xl bg-[#181611] border-4 border-[#393328]"></textarea>
            </div>
            <div className="mt-8 ml-10 flex flex-col ">
               <label htmlFor="description" className="ml-8">Price</label>
               <input type="number" className="h-10 rounded-xl bg-[#181611] border-4 border-[#393328] mt-4"/>
            </div>
        </div>
    );
}

export default DescriptionAndPrice;