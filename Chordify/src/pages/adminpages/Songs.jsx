// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useApi } from "../hooks/useAPI";

// export default function Songs() {
//   const { callApi } = useApi();

//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Add Song modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newSong, setNewSong] = useState({
//     title: "",
//     artist: "",
//     difficulty: "easy",
//     strummingPattern: "",
//     cover_image: null,
//     content: "",
//     links: [""],
//   });
//   const [uploading, setUploading] = useState(false);

//   // Fetch all songs
//   const fetchSongs = async () => {
//     try {
//       setLoading(true);
//       const data = await callApi("GET", "/api/admin/songs");
//       setSongs(data);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "Failed to fetch songs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   // Delete a song
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this song?")) return;
//     try {
//       await callApi("DELETE", `/api/admin/songs/${id}`);
//       toast.success("Song deleted successfully");
//       setSongs((prev) => prev.filter((song) => song.id !== id));
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "Failed to delete song");
//     }
//   };

//   // Handle form field changes
//   const handleChange = (e, index = null) => {
//     const { name, value, files } = e.target;
//     if (name === "cover_image") {
//       setNewSong((prev) => ({ ...prev, cover_image: files[0] }));
//     } else if (name === "links" && index !== null) {
//       const updatedLinks = [...newSong.links];
//       updatedLinks[index] = value;
//       setNewSong({ ...newSong, links: updatedLinks });
//     } else {
//       setNewSong((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const addLinkInput = () =>
//     setNewSong({ ...newSong, links: [...newSong.links, ""] });
//   const removeLinkInput = (index) => {
//     const updatedLinks = [...newSong.links];
//     updatedLinks.splice(index, 1);
//     setNewSong({ ...newSong, links: updatedLinks });
//   };

//   // Submit new song
//   const handleAddSong = async (e) => {
//     e.preventDefault();

//     if (
//       !newSong.title ||
//       !newSong.artist ||
//       !newSong.strummingPattern ||
//       !newSong.cover_image
//     ) {
//       toast.error("Please fill all required fields and upload a cover image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", newSong.title);
//     formData.append("artist", newSong.artist);
//     formData.append("difficulty", newSong.difficulty);
//     formData.append("strummingPattern", newSong.strummingPattern);
//     formData.append("cover_image", newSong.cover_image);
//     formData.append("content", newSong.content || null);
//     formData.append("links", JSON.stringify(newSong.links));

//     try {
//       setUploading(true);
//       await callApi("POST", "/api/admin/songs/add", { data: formData });
//       toast.success("Song added successfully");
//       fetchSongs();
//       setShowModal(false);
//       setNewSong({
//         title: "",
//         artist: "",
//         difficulty: "easy",
//         strummingPattern: "",
//         cover_image: null,
//         content: "",
//         links: [""],
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "Failed to add song");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const filteredSongs = songs.filter(
//     (song) =>
//       song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       song.artist.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       {/* Header and Add button */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold text-white">All Songs</h1>
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={() => setShowModal(true)}
//         >
//           Add Song
//         </button>
//       </div>

//       {/* Search bar */}
//       <input
//         type="text"
//         placeholder="Search songs by title or artist..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full px-3 py-2 rounded bg-zinc-700 text-white mb-4"
//       />

//       {/* Songs table */}
//       {loading ? (
//         <p className="text-white">Loading...</p>
//       ) : filteredSongs.length === 0 ? (
//         <p className="text-white">No songs found</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300 text-white">
//             <thead>
//               <tr className="bg-gray-800">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Title</th>
//                 <th className="border p-2">Artist</th>
//                 <th className="border p-2">Difficulty</th>
//                 <th className="border p-2">Strumming Pattern</th>
//                 <th className="border p-2">Links</th>
//                 <th className="border p-2">Cover</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSongs.map((song) => (
//                 <tr key={song.id} className="text-center">
//                   <td className="border p-2">{song.id}</td>
//                   <td className="border p-2">{song.title}</td>
//                   <td className="border p-2">{song.artist}</td>
//                   <td className="border p-2 capitalize">{song.difficulty}</td>
//                   <td className="border p-2">{song.strummingPattern}</td>
//                   <td className="border p-2">
//                     {song.links?.map((link, idx) => (
//                       <div key={idx}>
//                         <a
//                           href={link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 underline"
//                         >
//                           Link {idx + 1}
//                         </a>
//                       </div>
//                     ))}
//                   </td>
//                   <td className="border p-2">
//                     <img
//                       src={`http://localhost:5000${song.cover_image}`}
//                       alt={song.title}
//                       className="w-20 h-20 object-cover mx-auto"
//                     />
//                   </td>
//                   <td className="border p-2 space-x-2">
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() => handleDelete(song.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Add Song Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-zinc-900 p-6 rounded w-2/3 max-w-lg text-white">
//             <h2 className="text-xl font-bold mb-4">Add New Song</h2>
//             <form onSubmit={handleAddSong} className="space-y-3">
//               {/* form fields remain same */}
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
