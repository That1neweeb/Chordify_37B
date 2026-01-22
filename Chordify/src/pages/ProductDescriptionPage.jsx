import electric from '../assets/images/electric.png'
import acoustic from '../assets/images/acoustic.png'
import acoustic2 from '../assets/images/acoustic2.png'
import electric2 from '../assets/images/electric2.png'
import addtocart from '../assets/images/add-to-cart.png'
import favourite from '../assets/images/favourite.png'
import chatbubble from '../assets/images/chat-bubble.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CommentModal from '../components/CommentModal'
import StarRating from '../components/StarRating'
import useApi from '../hooks/useAPI.js'

function ProductDescriptionPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    // const [totalRatings, setTotalRatings] = useState(0); 


    const {callApi} = useApi();


    
    
    
    // to fetch the clicked product 
    useEffect(()=> {
        const fetchProduct = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(res.data.data)
            } catch(e) {
                console.error("Error fetching product: ", e);
                
            } finally {
                setLoading(false)
            }
            
        }; fetchProduct();
    }, [id]);

    //for loading and message if product is not found
    if(loading) return <p>Loading ...</p>
    if(!product) return <p>Product not found</p>
    
    //fetching the average rating of the product
    // const fetchRating = async () => {
    //     try {
    //         const res = await callApi("GET", `/products/${product.id}/ratings`);
    //         setAverageRating(res.average);
    //         setTotalRatings(res.totalRatings);
    //     } catch (e) {
    //         console.error("Error fetching product rating:", e);
    //     }
    // };

    // useEffect(() => {
    //     if (product.id) fetchRating();
    // }, [product.id]);
    

    //add product to cart
    const addToCart = async() => {
        try {
        const { data } = await axios.post(`http://localhost:5000/cart/add`, {
            user_id: 13,          // TEMP until auth is added
            product_id: product.id,
            quantity: 1
        });
        console.log("Add to cart response:", data);
        alert("Added to cart");
        } catch (err) {
            console.error("Add to cart error:", err.response?.data || err);
            alert("Failed to add to cart");
        }
    }

    //add product to favourite
    const addToFav = async () => {
        try {
            const res = await callApi("POST", `/favourites/${product.id}`, {});
            console.log("Added to favourite:", res);
        } catch (err) {
            console.log("Error adding favourite:", err);
        }
    };


    return (
        <div className='flex flex-col mt-10 ml-10 p-10 gap-10'>
            <div className='flex gap-4'>
                {/* Image ()*/}
                <img src={`http://localhost:5000${product.image_urls[0]}`} alt="" className='object-center object-cover h-[900px] w-[800px]'/>
                <div>
                    <h3 className='text-[#ABA6A6]'>{product.brand}</h3>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <h1 className='text-3xl font-bold'>{product.name}</h1>
                            <h1>{averageRating}</h1>
                        </div>
                        <h2 className='text-xl font-semibold mt-4'>Rs. {product.price}</h2>
                        <h2 className='mt-6'>Description</h2>
                        <p className='text-sm text-[#ABA6A6]'>{product.description}</p>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-14 h-60'>
                   <div className='flex gap-14'>
                    <img src={electric} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    <img src={acoustic} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    <img src={acoustic2} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    <img src={electric2} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    </div>

                    <div className='flex flex-col'>
                        
                        <div className='flex gap-2 items-center'>
                        
                            <button onClick={()=> addToFav()}>
                                <img src={favourite} alt="" className='w-8 object-fit'/>
                            </button>

                            <button 
                                className='w-[600px] h-10 flex justify-center items-center bg-[#F2A60D] text-black text-sm gap-6'
                                onClick={()=> addToCart()}
                            >
                                <img src={addtocart} alt="" className='size-5'/>Add to Cart
                            </button>


                            <button onClick={()=> setIsCommentOpen(true)}>
                                <img src={chatbubble} alt="" className='w-8 object-fit'/>
                            </button>
                        </div>

                        <div className='flex mt-10 ml-6 gap-10'>
                            <h3>Rate this product : </h3> 
                            <StarRating product_id={product.id}/>
                        </div>
                    </div>
                    
                
            </div>

            { isCommentOpen && 
                <CommentModal
                    product_id={product.id}
                    close = {()=> setIsCommentOpen(false)} //closing when the x button is clicked
                />
            }
        </div>
        
    );
}

export default ProductDescriptionPage;