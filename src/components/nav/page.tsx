"use client";
import { useState } from "react";
import SearchResults from "../search-results";
const Navigation = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for storing search results
  const handleToggleGenres = () => {
    setShowGenres((prev) => !prev);
  };

  const handleSearchInputToggle = () => {
    setShowInput((prev) => !prev);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page},/search/movie?api_key=${token}&query=${searchQuery}`
    );

    if (response.ok) {
      const data = await response.json();
      setSearchResults(data.results);
    } else {
      console.error("Error fetching search results");
    }
  };
  return (
    <div className="flex flex-row bg-white h-8 sm:w-[] md:w-full p-2   items-center justify-between">
      <button className=" flex justify-start">
        <img src="/images/Logo.png" className="flex w-13 h-3" alt="Logo" />
      </button>

      <div className=" md:flex justify-center  gap-2  hidden ">
        <button
          type="button"
          onClick={handleToggleGenres}
          className=" flex gap-3 flex-row items-center border border-gray-300 w-[100px] justify-center  rounded"
        >
          <img
            src="/images/down.png"
            className=" w-5 h-5 rounded justify-center items-center  "
          />
          <h1>Genre</h1>
        </button>
        <div className=" flex-row flex w-[300px] border border-gray-300 rounded items-center  gap-2">
          <button
            type="button"
            className="w-5 h-5 flex rounded justify-center items-center "
          >
            <img
              src="/images/Search.png"
              className="flex w-4 h-4 justify-center items-center"
              alt="Search"
            />
          </button>

          <input type="text" placeholder="Search ..." className="  " />
        </div>
      </div>

      <div className=" flex justify-end gap-2">
        <button
          type="button"
          onClick={handleSearchInputToggle}
          className="w-5 h-5 md:hidden border border-gray-300 rounded justify-center items-center flex"
        >
          <img src="/images/Search.png" className="flex w-3 h-3" alt="Search" />
        </button>
        {showInput && (
          <input
            type="text"
            placeholder="Search ..."
            className="border border-gray-300 rounded w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        )}

        <button className="w-5 h-5 flex border border-gray-300 rounded justify-center items-center ">
          <img
            src="/images/moon.png"
            className="flex w-3 h-3"
            alt="Theme Toggle"
          />
        </button>
      </div>

      <div className=" flex absolute  md:w-[550px] md:mt-[40] justify-center mt-26 sm:w-[350px]">
        <div className="   flex absolute">
          {showGenres && <SearchResults />}
          {searchResults.length > 0 && (
            <div className="bg-white border border-gray-300 rounded p-2 mt-2">
              <h3>Search Results:</h3>
              <ul>
                {searchResults.slice(0, 5).map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
...................
// "use client";
// import { useState, useEffect } from "react";
// import SearchResults from "../search-results"; // Adjust the path as necessary

// // Define the type for a Movie
// type Movie = {
//   id: number;
//   title: string;
//   // Add other properties as needed
// };

// const Navigation: React.FC = () => {
//   const [showGenres, setShowGenres] = useState<boolean>(false);
//   const [showInput, setShowInput] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
//   const [searchResults, setSearchResults] = useState<Movie[]>([]); // State for storing search results
//   const [filteredResults, setFilteredResults] = useState<Movie[]>([]); // State for filtered results

//   const handleToggleGenres = () => {
//     setShowGenres((prev) => !prev);
//   };

//   const handleSearchInputToggle = () => {
//     setShowInput((prev) => !prev);
//   };

//   const handleSearch = async (query: string) => {
//     if (query.trim() === "") return;

//     const token =
//       "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";
//     const response = await fetch(
//       `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`
//     );

//     if (response.ok) {
//       const data = await response.json();
//       setSearchResults(data.results);
//       setFilteredResults(data.results);
//     } else {
//       console.error("Error fetching search results");
//     }
//   };

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setFilteredResults(searchResults);
//     } else {
//       const filtered = searchResults.filter((movie) =>
//         movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredResults(filtered);
//     }
//   }, [searchQuery, searchResults]);

//   return (
//     <div className="flex flex-row bg-white h-8 sm:w-[] md:w-full p-2 items-center justify-between">
//       <button className="flex justify-start">
//         <img src="/images/Logo.png" className="flex w-13 h-3" alt="Logo" />
//       </button>

//       <div className="md:flex justify-center gap-2 hidden">
//         <button
//           type="button"
//           onClick={handleToggleGenres}
//           className="flex gap-3 flex-row items-center border border-gray-300 w-[100px] justify-center rounded"
//         >
//           <img
//             src="/images/down.png"
//             className="w-5 h-5 rounded justify-center items-center"
//           />
//           <h1>Genre</h1>
//         </button>
//       </div>

//       <div className="flex justify-end gap-2">
//         <div className="flex-row flex  border border-gray-300 rounded items-center gap-2">
//           <button
//             type="button"
//             onClick={handleSearchInputToggle}
//             className="w-5 h-5 flex rounded justify-center items-center"
//           >
//             <img
//               src="/images/Search.png"
//               className="flex w-4 h-4 justify-center items-center"
//               alt="Search"
//             />
//           </button>

//           {showInput && (
//             <input
//               type="text"
//               placeholder="Search ..."
//               className="border border-gray-300 rounded w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSearch(searchQuery);
//                 }
//               }}
//             />
//           )}
//         </div>

//         <button className="w-5 h-5 flex border border-gray-300 rounded justify-center items-center">
//           <img
//             src="/images/moon.png"
//             className="flex w-3 h-3"
//             alt="Theme Toggle"
//           />
//         </button>
//       </div>

//       <div className="absolute md:w-[550px] md:mt-[40] justify-center mt-26 sm:w-[350px]">
//         {showGenres && <SearchResults />}
//         {filteredResults.length > 0 && (
//           <div className="bg-white border border-gray-300 rounded p-2 mt-2">
//             <h3>Search Results:</h3>
//             <ul>
//               {filteredResults.map((movie) => (
//                 <li key={movie.id}>{movie.title}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navigation;
