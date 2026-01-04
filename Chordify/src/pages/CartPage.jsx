import CartCard from "../components/CartCard";
import electric2 from "../assets/images/electric2.png"
import acoustic from "../assets/images/acoustic.png"
import CartTable from "../components/CartTable";
import CartFooter from "../components/CartFooter";

function CartPage() {
       const cartItems = [
      {
        id: 1,
        name: "Dream Maker Semi Acoustic Guitar",
        brand: "Yamaha",
        price: 15000,
        image: electric2,
        quantity: 1,
      },
      {
        id: 2,
        name: "Dream Maker UK21 (combo)",
        brand: "Enya",
        price: 3500,
        image: acoustic,
        quantity: 1,
      },
    ];


    //total price calculation
    const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
    }, 0);
    
    return(
        <div className="py-10"> 
            <h2 className="font-bold text-3xl mt-20 ml-36 mb-10">Your cart</h2>
            <div className="p-10 px-40">
                <CartTable/>

                {cartItems.map(item => (
                    <CartCard
                        key={item.id}
                        image={item.image}
                        productBrand={item.brand}
                        productName={item.name}
                        price={item.price}
                    />
                ))}
            </div>
            <CartFooter
                totalPrice={totalPrice}
            />
        </div>
    );
}

export default CartPage;