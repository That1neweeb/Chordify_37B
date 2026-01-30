
function CartFooter({totalPrice, onCheckout}) {
    return(
        <div className="flex flex-col gap-20">
            <div className="flex items-center justify-between ml-40 mr-80">
                <h2>Total : </h2>
                <h2>Rs.{totalPrice}</h2>
            </div>
            <button className="self-center w-[150px] mx-40 mb-2 bg-[#F2A60D] text-black"   onClick={onCheckout} >Checkout</button>
        </div>
    );
}

export default CartFooter;