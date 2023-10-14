import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Rating, Badge } from "flowbite-react";
import Ratings from "../components/ratings";
import AvatarModal from "../components/navigation/avatar-modal";
import DisplaynameModal from "../components/navigation/displayname-modal";
import { AuthContext } from "../auth-context";
import { HiAnnotation, HiCalendar, HiTag, HiPlus, HiClock } from 'react-icons/hi';
import ReleaseDate from "../components/release-date";
import DynamicToast from "../components/toast";
import Stores from "../components/where-to-buy";
import Platforms from "../components/platforms";


const FullGame = (props) => {
  const games = props.handleState;
  const searchGame = props.searchGame;
  const gameName = useParams();
  const [currentGame, setCurrentGame] = useState([]);

  const { showDiplaynameModal, showAviModal } = useContext(AuthContext)

  useEffect(() => {
    const res = games.find((game) => {
      if (game?.name.toLowerCase() === gameName.gameName) {
        setCurrentGame(game);
      }
    });
    return res;
  }, [props.handleState, gameName.gameName]);
  
  useEffect(() => {
    const res = searchGame.find((game) => {
      if (game?.name.toLowerCase() === gameName.gameName) {
        setCurrentGame(game);
      }
    });
    return res;
  }, [props.searchGame, gameName.gameName]);

  const screenshots = currentGame?.short_screenshots;
  const genres = currentGame.genres;
  const tags = currentGame.tags;

  const firstImg = screenshots?.find(item => {
    return item === screenshots[1];
  });
  const firstGenre = genres?.find(item => {
    return item === genres[1]
  })

  return (
    <>
      <div className="px-2 md:px-8 pt-28 h-fit">
        {showAviModal && <AvatarModal />}
        {showDiplaynameModal && <DisplaynameModal />}
        {currentGame && (
          <>
            <div className="">
              <div className="bg-slate-700 p-4 md:p-8 rounded-xl">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  <img className="w-full col-span-1 rounded-3xl" src={currentGame?.background_image} />
                  <div 
                    className="w-full h-80 md:col-span-2 rounded-3xl relative"
                    style={{
                      backgroundImage: `url(${firstImg?.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                    >
                    <div className="absolute -bottom-2 md:-bottom-6 -right-1 md:-right-4 bg-gradient-to-tr from-pink-300 to-pink-500 rounded-2xl p-1 md:p-3">
                      <Platforms {...currentGame} />
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl font-bold text-slate-200 text-center my-10">{currentGame.name}</h1>
                <div className="bg-slate-800 text-slate-200 p-6 rounded-2xl">
                  <div className="bg-slate-700 rounded-2xl p-6">
                    <Ratings {...currentGame} />
                  </div>
                  <div className="flex flex-col md:flex-row justify-around gap-6 mt-6 w-full">
                    <div className="bg-slate-700 flex items-center justify-between rounded-2xl w-full md:w-1/2 p-6">
                      <span className="max-w-xs">
                        <p className="font-bold">{currentGame?.name}</p>
                        <p className="text-slate-400">{firstGenre?.name}</p>
                      </span>
                      <span className="text-center">
                        <p>Rating</p>
                        <Rating><Rating.Star />{currentGame?.rating}</Rating>
                      </span>
                    </div>
                    <div className="bg-slate-700 flex items-center justify-between rounded-2xl w-full md:w-1/2 p-6">
                      <span className="flex flex-col items-center gap-2">
                        <HiAnnotation color="pink" size={24} />
                        {currentGame.reviews_count}
                      </span>
                      <span className="flex flex-col items-center gap-2">
                        <HiPlus color="pink" size={24} />
                        {currentGame?.added}
                      </span>
                      <span className="flex flex-col items-center gap-2">
                        <HiCalendar color="pink" size={24} />
                        <ReleaseDate props={currentGame.released} />
                      </span>
                      <span className="flex flex-col items-center gap-2">
                        <HiClock color="pink" size={24} />
                        {currentGame?.playtime}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col md:flex-row justify-around px-0 md:px-6 gap-6 mt-6">
                    {screenshots?.slice(2,5).map((item) => {
                      return (
                        <img key={item.id} className="w-full md:w-1/3 rounded-2xl" src={item.image} />
                      )
                    })}
                  </div>
                  <h2 className="my-6 font-bold tracking-wide text-xl">{tags ? 'Tags' : ""}</h2>
                  <div className="flex gap-2 flex-wrap">
                    {tags && (
                      tags.slice(0, 8).map((item) => {
                        return (
                          <Badge color='purple' key={item.id} icon={HiTag} className="px-3">
                            <p className="truncate">
                              {item.name}
                            </p>
                          </Badge>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="fixed bottom-10 right-10 z-50">
          <DynamicToast />
        </div>
      </div>
    </>
  )
}

export default FullGame;