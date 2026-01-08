import electric from '../assets/images/electric.png'
import acoustic from '../assets/images/acoustic.png'
import acoustic2 from '../assets/images/acoustic2.png'
import electric2 from '../assets/images/electric2.png'
import addtocart from '../assets/images/add-to-cart.png'
import favourite from '../assets/images/favourite.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ProductDescriptionPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


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

    if(loading) return <p>Loading ...</p>
    if(!product) return <p>Product not found</p>

    return (
        <div className='flex flex-col mt-10 ml-10 p-10 gap-20'>
            <div className='flex gap-4'>
                {/* Image ()*/}
                <img src={`http://localhost:5000${product.image_urls[0]}`} alt="" className='object-center object-cover h-[900px] w-[800px]'/>
                <div>
                    <h3 className='text-[#ABA6A6]'>{product.brand}</h3>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <h1 className='text-3xl font-bold'>{product.name}</h1>
                            <h1>{product.rating}</h1>
                        </div>
                        <h2 className='text-xl font-semibold mt-4'>Rs. {product.price}</h2>
                        <h2 className='mt-6'>Description</h2>
                        <p className='text-sm text-[#ABA6A6]'>{product.description}</p>
                    </div>
                </div>
            </div>

            <div className='flex items-end gap-80'>
                   <div className='flex gap-14'>
                    <img src={electric} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    <img src={acoustic} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    <img src={acoustic2} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    <img src={electric2} alt="" className='rounded-xl h-[200px] w-[150px] object-fit object-cover'/>
                    </div>

                    <div className='flex gap-10 items-center'>
                        <button className='w-80 h-10 flex items-center bg-[#F2A60D] text-black text-sm gap-6'><img src={addtocart} alt="" className='size-5 ml-10'/>Add to Cart</button>
                        <button><img src={favourite} alt="" className='w-8 object-fit'/></button>
                    </div>
                
            </div>
        </div>
    );
}

export default ProductDescriptionPage;