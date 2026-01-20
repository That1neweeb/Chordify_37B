import CartCard from "../components/CartCard";
import electric2 from "../assets/images/electric2.png"
import acoustic from "../assets/images/acoustic.png"
import CartTable from "../components/CartTable";
import CartFooter from "../components/CartFooter";
import { useEffect, useState } from "react";
import axios from "axios";

function CartPage() {


    const[cartItems, setCartItems] = useState([]);
    const user_id = 13; //hard coded for now bc i havent set the authtoken
    
    //to fetch the cart items that the user has added 
    useEffect(()=> {
        const fetchCart = async() => {
            try {
                const res  = await axios.get(`http://localhost:5000/cart/items?user_id=${user_id}`);
                setCartItems(res.data.cartItems);
            } catch(e) {
                console.log(e);
            }
        };

        fetchCart();
    }, []);

    // to update the quantity of cartitems in the database / backend
    const updateQuantity = async(cartItemId, newQty) => {
        try {
            await axios.patch(`http://localhost:5000/cart/item/${cartItemId}`, {
                quantity : newQty
            });

            setCartItems(prev=> 
                prev.map(item => item.id === cartItemId ? {...item, quantity: newQty} : item)
            )
        } catch(e) {
            console.log("Error updating quantity : ", e);
            
        }
    }

    //to increase the quantity of item of cart
    const increaseQty = (id) => {
    setCartItems(prev =>
        prev.map(item =>
        item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
    );
    };

    //to decrease the quantity of item of cart
    const decreaseQty = (id) => {
    setCartItems(prev =>
        prev.map(item =>
        item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
    );
    };




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
                        id={item.id}
                        image={`http://localhost:5000${item.image}`}
                        productBrand={item.brand}
                        productName={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onQuantityChange={updateQuantity}
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