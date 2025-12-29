import { useEffect, useState } from "react";
import LyricsCard from "../components/SongLyricsCard.jsx";
import SongSidebar from "../components/SongSideBar.jsx";
function Song({songId}) {
//     const testSong = {
//   id: 1,
//   title: "Bistarai Bistarai",
//   artist: "Nepathya",
//   difficulty: "medium",
//   cover_image: "https://example.com/cover.jpg",
//   content: {
//     sections: [
//       {
//         type: "verse",
//         lines: [
//           {
//             lyrics: "Bistarai bistarai timi aaideu",
//             chords: [
//               { chord: "Cadd9", position: 0 },
//               { chord: "G", position: 11 }
//             ]
//           },
//           {
//             lyrics: "Mero mutu bhitra basi deu",
//             chords: [
//               { chord: "Em", position: 0 },
//               { chord: "D", position: 17 }
//             ]
//           }
//         ]
//       },
//       {
//         type: "chorus",
//         lines: [
//           {
//             lyrics: "Yo mutu mero ho timrai lagi",
//             chords: [
//               { chord: "G", position: 0 },
//               { chord: "D", position: 14 },
//               { chord: "Em", position: 22 }
//             ]
//           },
//           {
//             lyrics: "Saath deu sadai bhari",
//             chords: [
//               { chord: "C", position: 0 },
//               { chord: "G", position: 10 }
//             ]
//           }
//         ]
//       }
//     ],
//     links: "https://www.youtube.com",
      
//   }
// };
// const song = testSong;
     const [song, setSongs] = useState({});
    
    useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await fetch(`https://localhost:5000/songs/songContent/${songId}`);
                const data = await response.json();
                setSongs(data);
            } catch(err) {
                console.log("fetching error : " +err);
            }
    
        }
        fetchSongs() 
    }, []);

    return(
         <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main song card */}
        <div className="lg:col-span-3">
          <LyricsCard song={song} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SongSidebar song={song} />
        </div>

        </div>
        </div>
    )
}

export default Song