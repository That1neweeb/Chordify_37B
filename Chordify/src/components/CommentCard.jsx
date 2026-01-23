function CommentCard({username, profile, text, time}) {
    return(
        <div className="flex gap-4">
            
            <img src={profile} alt="" className="rounded-full object-cover object-center w-10 h-10" />
          
            <div>
                <div>
                    <div className="flex gap-4">
                        <span className="font-bold">{username}</span>
                        <span>{time}</span>
                    </div>
                    {text}
                </div>
            </div>
        </div>
    )
}

export default CommentCard;