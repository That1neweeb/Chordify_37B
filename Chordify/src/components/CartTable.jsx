
function CartTable() {
    return(
        <div className="grid grid-cols-12 items-center mb-4">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right mr-20">Total</div>
        </div>
    );
}

export default CartTable;