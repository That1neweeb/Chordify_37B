export default function PostCard({ content }) {
  return (
    <div className="post-card bg-[#27231B] w-[800px] h-[600px] rounded-2xl flex flex-col items-center justify-around">
      <video
        src={`http://localhost:5000${content.video_URLS}`}
        controls
        className="border-2xl my-6 w-[700px]"
      />
      <div className="w-[500px] my-6 flex flex-col justify-start">
        <h2 className="font-bold">{content.title}</h2>
        <h4 className="text-[#B7B3B3]">{content.description}</h4>
        <h6 className="text-[#B7B3B3] text-sm">Posted By {content.uploadedBy}</h6>
      </div>
    </div>
  );
}
