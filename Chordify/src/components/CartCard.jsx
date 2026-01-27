import remove from "../assets/images/remove.png"
function CartCard({id, image, productName, productBrand, price, quantity, onQuantityChange, onRemove}) {

    return(
        <div className="grid grid-cols-12 items-center py-6 border-b gap-[150px]">
            <div className="col-span-6 flex gap-14 w-full">
                <img src={image} alt="" className="size-28 object-fit object-cover"/>
                <div className="flex flex-col gap-1">
                    <h1 className="text-sm text-[#ABA6A6]">{productBrand}</h1>
                    <h1 className="text-base">{productName}</h1>
                    <p>Rs.{price}</p>
                </div>
            </div>

            <div className=" col-span-3 flex gap-10">
                <div className="flex border border-[#ABA6A6] items-center">
                    <button onClick={() => onQuantityChange(id, quantity - 1)}>-</button>
                    <h2>{quantity}</h2>
                    <button onClick={() => onQuantityChange(id, quantity + 1)}>+</button>
                </div>
                <div className="bg-transparent">
                    <button
                        className="bg-transparent border-none focus:border-none focus:outline-none hover:scale-105 transition-all duration-300"
                        onClick={() => {onRemove(id);}}

                    >
                        <img src={remove} alt="" className="size-6 object-cover object-fit"/>
                    </button>
                </div>
            </div>

            <div className="col-span-3">
                <h2>Rs. {price * quantity}</h2>
            </div>
        </div>
    )
}

export default CartCard;
