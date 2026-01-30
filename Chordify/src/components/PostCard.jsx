export default function PostCard({ content }) {
  return (
    <div className="post-card bg-[var(--card-bg)]  w-[800px] h-[600px] rounded-2xl flex flex-col items-center justify-around border-2 border-[var(--border-color)]">
      <video
        src={`http://localhost:5000${content.video_URLS}`}
        controls
        className="border-2xl my-6 w-[700px]"
      />
      <div className="w-[500px] my-6 flex flex-col justify-start">
        <h2 className="font-bold">{content.title}</h2>
        <h4 className="">{content.description}</h4>
        <h6 className=" text-sm">Posted By {content.uploadedBy}</h6>
      </div>
    </div>
  );
}
