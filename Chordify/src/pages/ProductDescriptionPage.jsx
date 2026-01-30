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
    const [product, setProduct] = useState(null)
    const [mainImage, setMainImage] = useState('')
    const [averageRating, setAverageRating] = useState(0)
    const [loading, setLoading] = useState(true)
    const [isCommentOpen, setIsCommentOpen] = useState(false)

    const { callApi } = useApi()

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products/${id}`)                
                setProduct(res.data.data)
                console.log(res.data);
                
            } catch (e) {
                console.error('Error fetching product: ', e)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    // Set main image after product loads
    useEffect(() => {
        if (product?.image_urls?.length > 0) {
            setMainImage(`http://localhost:5000${product.image_urls[0]}`)
        }
    }, [product])

    // Add to cart
    const addToCart = async () => {
        try {
            const { data } = await axios.post(`http://localhost:5000/cart/add`, {
                user_id: 13, // TEMP until auth is added
                product_id: product.id,
                quantity: 1,
            })
            console.log('Add to cart response:', data)
            alert('Added to cart')
        } catch (err) {
            console.error('Add to cart error:', err.response?.data || err)
            alert('Failed to add to cart')
        }
    }

    // Add to favourite
    const addToFav = async () => {
        try {
            const res = await callApi('POST', `/favourites/${product.id}`, {})
            console.log('Added to favourite:', res)
        } catch (err) {
            console.log('Error adding favourite:', err)
        }
    }

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

    if (loading) return <p>Loading ...</p>
    if (!product) return <p>Product not found</p>

    return (
        <div className="flex flex-col mt-10 ml-10 p-10 gap-10">
            <div className="flex gap-4">
                {/* Big image with hover arrows */}
                <div className="relative group">
                    <img
                        src={mainImage}
                        alt=""
                        className="object-center object-cover h-[900px] w-[800px]"
                    />

                    {/* Left arrow */}
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => changeImage('prev')}
                    >
                        &#8592;
                    </button>

                    {/* Right arrow */}
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => changeImage('next')}
                    >
                        &#8594;
                    </button>
                </div>

                {/* Product info */}
                <div>
                    <h3 className="text-[#ABA6A6]">{product.brand}</h3>
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <h1>{averageRating}</h1>
                        </div>
                        <h2 className="text-xl font-semibold mt-4">Rs. {product.price}</h2>
                        <h2 className="mt-6">Description</h2>
                        <p className="text-sm text-[#ABA6A6]">{product.description}</p>
                    </div>
                </div>
            </div>

            {/*  preview images  */}
            <div className="flex items-center gap-14 h-60">
                <div className="flex gap-14">
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
                        <button onClick={addToFav}>
                            <img src={favourite} alt="" className="w-8" />
                        </button>

                        <button
                            className="w-[600px] h-10 flex justify-center items-center bg-[#F2A60D] text-black text-sm gap-6"
                            onClick={addToCart}
                        >
                            <img src={addtocart} alt="" className="w-5" />
                            Add to Cart
                        </button>

                        <button onClick={() => setIsCommentOpen(true)}>
                            <img src={chatbubble} alt="" className="w-8" />
                        </button>
                    </div>

                    <div className="flex mt-10 ml-6 gap-10">
                        <h3>Rate this product : </h3>
                        <StarRating product_id={product.id} />
                    </div>
                </div>
            </div>

            {isCommentOpen && (
                <CommentModal product_id={product.id} close={() => setIsCommentOpen(false)} />
            )}
        </div>
    )
}

export default ProductDescriptionPage
