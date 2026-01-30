import acoustic from "../assets/images/acoustic.png";
import cross from "../assets/images/cross-button.png"
import guitarplaying from "../assets/images/guitarplaying.png"
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useApi } from "../hooks/useAPI.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);


function CommentModal({ product_id, productImage, close}) {

    const[comment_text, setComment] = useState("");
    const[comments, setComments] = useState([]);

      // Disable background scroll when modal is mounted
        useEffect(() => {
            document.body.classList.add("overflow-hidden"); // disable scroll

            return () => {
            document.body.classList.remove("overflow-hidden"); // commentstore scroll
            };
        }, []);

        const {loading, callApi} = useApi();
     

        
        // to fetch the comment posted
         const fetchComment = async () => {
            try {
                const res = await callApi("GET", `/products/comments/${product_id}`, {});
                setComments(res.data || []);
            } catch (e) {
                console.log("Error fetching comments", e);
                setComments([]);
            }
        };


        //fetching the comment 
        useEffect(()=> {
            if(!product_id) return;
            fetchComment();
        }, [product_id])
        
        // for posting a comment   
        const postComment = async() => {
            if(!comment_text.trim()) return;
            try {
                const commentsponse = await callApi("POST", `/products/${product_id}/addcomment`, {data: {comment_text: comment_text}});
                console.log("Server commentsponse : ", commentsponse);
                toast.success("Comment posted");

                setComment("");

                fetchComment(); // fetch the comment that is just added
                
            } catch(e) {
                console.error("API error : ", e);
            }
        }

    return(
        // main div overlay
        <div className="flex fixed inset-0 items-center justify-center bg-black/60">
           

        {/* close button (x)*/}
            <button 
                className="absolute right-1 top-8 bg-transparent z-20"
                onClick={close}
            >
                <img src={cross} alt=""className="w-8" />
            </button>

        {/* actual comments and image containing div */}
            <div className="flex h-[800px] w-[1400px] bg-white rounded-xl overflow-hidden relative">
                
                {/* image of the product */}
                <div className="flex-[3]">
                    <img src={productImage} alt="" className="w-full h-full object-cover object-center" />
                </div>
               
                {/* comment section */}
                <div className="flex-[3] bg-[#27231B] flex flex-col">

                    {/* existing comments */}
                   <div className="overflow-auto p-4 flex-1 gap-8 flex flex-col">
                        {loading ? (
                            <p className="text-gray-400 text-center mt-10">Loading comments...</p>
                        ) : comments.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10">No comments yet</p>
                        ) : (
                            comments.map(comment => (
                            <CommentCard
                                key={comment.id}
                                username={comment.User.full_name}
                                profile={guitarplaying} // you can replace with product image if needed
                                text={comment.comment_text}
                                time={dayjs(comment.createdAt).fromNow()}                            />
                            ))
                        )}
                    </div>


            
                    {/* input field at the bottom */}
                    <div className="p-4 border-t border-gray-700 flex">
                        <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full rounded px-3 py-2 text-white outline-none"
                        value={comment_text}
                        onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="bg-transparent" onClick={postComment}>Post</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CommentModal;