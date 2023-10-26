import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth-context";
import UserLibraryTable from "./home/user-library-table";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from 'react-icons/hi';

function GameLibrary() {

  const [gameLibrary, setGameLibrary] = useState([]);
  const { fetchGameLibrary, currentUid } = useContext(AuthContext);


  useEffect(() => {
    const fetchLibrary = async () => {
      const games = await fetchGameLibrary();
      setGameLibrary(games);
    };
    fetchLibrary();
  }, [currentUid]);

  return (
    <>
      <section className="flex flex-col gap-6 pt-28 px-3 lg:px-8 w-full h-full">
        <Link to='/' className="text-slate-300 flex items-center gap-3 hover:underline underline-offset-2">
          <HiOutlineArrowLeft />
          Back to home
        </Link>
        <div className="bg-slate-600 p-6 rounded-xl">
          <div className="bg-slate-800 p-4 rounded-xl">
            <UserLibraryTable />
          </div>
        </div>
      </section>
    </>
  )
}

export default GameLibrary;