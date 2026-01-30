import React from "react";

const PostTable = ({ posts, onApprove, onReject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-zinc-800 rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-white">Title</th>
            <th className="px-4 py-2 text-left text-white">Description</th>
            <th className="px-4 py-2 text-left text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t border-zinc-700">
              <td className="px-4 py-2 text-white">{post.title}</td>
              <td className="px-4 py-2 text-gray-300">{post.description}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onApprove(post.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => onReject(post.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
