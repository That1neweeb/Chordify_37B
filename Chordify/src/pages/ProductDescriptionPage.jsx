import addtocart from '../assets/images/add-to-cart.png'
import favourite from '../assets/images/favourite.png'
import chatbubble from '../assets/images/chat-bubble.png'
import buy from '../assets/images/buy.png'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentModal from '../components/CommentModal'
import StarRating from '../components/StarRating'
import useApi from '../hooks/useAPI.js'
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { Heart } from 'lucide-react';
import { ArrowLeft } from "lucide-react";



function ProductDescriptionPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [mainImage, setMainImage] = useState('')
    const [averageRating, setAverageRating] = useState(0)
    const [loading, setLoading] = useState(true)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false);
    const navigate = useNavigate();

    const { callApi } = useApi()

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await callApi("GET", `/products/${id}`)
                setProduct(res.data)
            } catch (e) {
                console.error('Error fetching product: ', e.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

  useEffect(() => {
    const fetchFavourites = async () => {
        try {
            const res = await callApi("GET", "/favourites");

            const favArray =
                res?.data?.favourites ||       
                res?.favourites ||             
                [];
            

            const favIds = favArray.map(fav => fav.product_id);
            setIsFavourite(favIds.includes(Number(id)));
        } catch (err) {
            console.error("Error fetching favourites:", err);
        }
    };

    fetchFavourites();
}, [id]);




    // Set main image after product loads
    useEffect(() => {
        if (product?.image_urls?.length > 0) {
            setMainImage(`http://localhost:5000${product.image_urls[0]}`)
        }
    }, [product])

    useEffect(() => {
    const fetchRating = async () => {
        try {
            const res = await callApi("GET", `/products/${id}/ratings`);
            setAverageRating(res.data.average);
        } catch (err) {
            console.error("Error fetching rating:", err.message);
        }
    };

    fetchRating();
}, [id, callApi]);


    // Add to cart
    const addToCart = async () => {
        try {
            const res = await callApi("POST", "/cart/add", { data: { product_id: product.id } })
            toast.success('Added to cart')
        } catch (err) {
            console.error('Add to cart error:', err.response.message)
            toast.error('Failed to add to cart')
        }
    }

    const toggleFavourite = async () => {
    try {
        if (isFavourite) {
            // If already favourite, remove it
            await callApi('DELETE', `/favourites/${product.id}`);
            toast.success('Removed from favourites');
            setIsFavourite(false); // update UI
        } else {
            // If not favourite, add it
            await callApi('POST', `/favourites/${product.id}`);
            toast.success('Added to favourites');
            setIsFavourite(true); // update UI
        }
    } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
    }
};


    // Change main image using arrows
    const changeImage = (direction) => {
        if (!product?.image_urls) return
        const currentIndex = product.image_urls.findIndex(
            (img) => `http://localhost:5000${img}` === mainImage
        )
        let newIndex = currentIndex

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % product.image_urls.length
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + product.image_urls.length) % product.image_urls.length
        }

        setMainImage(`http://localhost:5000${product.image_urls[newIndex]}`)
    }

       // for the buy now option : 
    const handleBuyNow = () => {
        navigate("/checkout", { state: { order: [{ ...product, quantity: 1 }] } });
    };

    if (loading) return <p>Loading ...</p>
    if (!product) return <p>Product not found</p>

    return (
        <div className="flex flex-col mt-10 ml-10 p-10 gap-10">
                <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 text-sm text-gray-200 hover:text-white border-none outline-none hover:border-none focus:outline-none transition"
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <div className="flex gap-4">
                <div className="relative group">
                    <img
                        src={mainImage}
                        alt=""
                        className="object-center object-cover h-[900px] w-[800px]"
                    />
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => changeImage('prev')}
                    >
                        &#8592;
                    </button>
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => changeImage('next')}
                    >
                        &#8594;
                    </button>
                </div>

                <div className='ml-10'>
                    <h3 className="text-[#ABA6A6]">{product.brand}</h3>
                    <div className="flex flex-col gap-2">
                        <div className='flex items-center gap-20'>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <span> rated : ({averageRating} ⭐)</span>
                        </div>
                        <h2 className="text-xl font-semibold mt-4">Rs. {product.price}</h2>
                        <h2 className="mt-6">Description</h2>
                        <p className="text-sm text-[#ABA6A6]">{product.description}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-14 h-60">
                <div className="flex gap-14 min-w-[800px]">
                    {product.image_urls.map((img, idx) => (
                        <img
                            key={idx}
                            src={`http://localhost:5000${img}`}
                            alt=""
                            className={`rounded-xl h-[200px] w-[150px] object-cover cursor-pointer hover:scale-105 transition-transform duration-200 ${mainImage === `http://localhost:5000${img}`? "border-4 border-[#F2A60D]": ""}`}
                            onClick={() => setMainImage(`http://localhost:5000${img}`)}
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={toggleFavourite}
                            className="p-2 rounded flex items-center justify-center border-none outline-none hover:border-none focus:border-none focus:outline-none"
                        >
                                <Heart
                                        size={28} // adjust size as needed
                                        color={isFavourite ? "red" : "gray"} // red when favourite
                                        fill={isFavourite ? "red" : "none"} // fills heart when favourite
                                        strokeWidth={2}
                                        className="transition-transform duration-200 hover:scale-110 cursor-pointer"
                                />                        
                        </button>


                        <div className="flex flex-col ml-6 gap-2">
                            <button
                                className="w-[600px] h-10 flex justify-center items-center bg-[#F2A60D] text-black text-sm gap-6"
                                onClick={addToCart}
                            >
                                <img src={addtocart} alt="" className="w-5" />
                                Add to Cart
                            </button>
                            <button
                                className="w-[600px] h-10 flex justify-center items-center bg-[#393328] text-sm gap-1"
                                onClick={handleBuyNow}
                            >
                                <img src={buy} alt="" className="w-5 mr-6" />
                                Buy now
                            </button>
                        </div>
                        <button onClick={() => setIsCommentOpen(true)}>
                            <img src={chatbubble} alt="" className="w-8" />
                        </button>
                    </div>


                    <div className="flex mt-1 ml-6 gap-10">
                        <h3>Rate this product : </h3>
                        <StarRating product_id={product.id}   setAverageRating={setAverageRating}  />
                        <span className="ml-2">{averageRating} ⭐</span>
                    </div>
                </div>
            </div>

            {isCommentOpen && (
                <CommentModal 
                    product_id={product.id} 
                    productImage={`http://localhost:5000${product.image_urls[0]}`}
                    close={() => setIsCommentOpen(false)} 
                />
            )}
        </div>
    )
}

export default ProductDescriptionPage
