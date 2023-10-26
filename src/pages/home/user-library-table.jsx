import React, { useEffect, useState, useContext } from "react";
import ReleaseDate from "../../components/release-date";
import TimeStamp from "../../components/timestamp";
import { AuthContext } from "../../auth-context";
import { Button, Tooltip, Rating } from "flowbite-react";
import { HiLightningBolt } from 'react-icons/hi';

function UserLibraryTable() {
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
      {gameLibrary.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {gameLibrary?.slice(0,2).map((game) => {
            return (
              <li 
                className="text-slate-400 flex flex-col lg:flex-row items-center lg:items-start justify-around w-full border-b border-slate-600 p-4 hover:bg-slate-700 rounded-xl" 
                key={game.id}
              >
                <div className="flex flex-col items-center gap-3">
                  <img className="lg:w-2/3 rounded-2xl" src={game?.photo} />
                  <span>
                    <Tooltip className="hidden lg:block" content={game?.gameName}>
                      <p className="font-bold text-slate-100">{game?.gameName}</p>
                    </Tooltip>
                    <p>{game?.genres[0].name}</p>
                  </span>
                </div>
                <div className="bg-slate-600 flex flex-col gap-4 p-2 rounded-xl w-full">
                  <span>
                    <p className="font-bold text-slate-100">Added to library</p>
                    <TimeStamp timestamp={game?.timestamp} />
                  </span>
                  <span>
                    <p className="font-bold text-slate-100">Rating</p>
                    <p className="flex">
                      <Rating>
                        <Rating.Star />
                      </Rating>
                      {game?.rating}
                    </p>
                  </span>
                  <span>
                    <p className="font-bold text-slate-100">Released</p>
                    <ReleaseDate props={game?.released} />
                  </span>
                  <Button className='w-full' gradientMonochrome="purple">View Game</Button>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="self-start text-slate-400">Start adding games to your library!</p>
      )}
    </>
  )
};

export default UserLibraryTable;