import React, { useState, useEffect, useContext } from "react";
import Skeleton from 'react-loading-skeleton';
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth-context";
import Platforms from "../../components/platforms";
import AvatarModal from "../../components/navigation/avatar-modal";
import DisplaynameModal from "../../components/navigation/displayname-modal";
import DynamicToast from "../../components/toast";
import { Button, Badge } from "flowbite-react";
import { HiLightningBolt } from 'react-icons/hi';
import SingleGame from "../single-game";

function Dashboard(props) {
  const games = props.handleState;
  const [moreGames, setMoreGames] = useState(false);

  const { showAviModal, showDiplaynameModal, setChosenSelection, gameDashSelection, setChosenTitle, chosenTitle, isLoading, setIsLoading } = useContext(AuthContext);

  let mainGame = games[0];
  let firstThree = games?.slice(6, `${moreGames ? 18 : 12}`);

  const handleSelection = (item) => {
    setChosenSelection(item.value);
    setChosenTitle(item.name);
  }

  return (
    <>
      <section className="flex gap-6 pt-28 px-3 lg:px-8 w-full">
        <div className="bg-slate-600 text-white rounded-xl relative flex flex-col gap-6 justify-center px-4 md:px-8 py-8 w-full">
          {showAviModal && <AvatarModal />}
          {showDiplaynameModal && <DisplaynameModal />}
          <h1 className="text-5xl font-bold tracking-wider">{chosenTitle} Games</h1>
          <h4 className="text-2xl">Based on player counts and ratings</h4>
          <div>
            <Link to={mainGame?.name.toLowerCase()} >
              {isLoading ?
              <Skeleton />
              :
                <div 
                  className="flex items-end w-full h-96 bg-slate-600 rounded-2xl shadow-2xl"
                  style={{
                    backgroundImage: `url(${mainGame?.background_image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                >
                  <div className="p-4 flex justify-between w-full">
                    <div>
                      <h1 className="text-4xl text-white mb-2 font-bold tracking-wide">{mainGame?.name}</h1>
                      <Platforms {...mainGame} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {mainGame?.metacritic ?
                      <Badge color='indigo' className='cursor-default p-2 flex items-center'>
                        Metacritic&nbsp;
                        <span className="text-lg">
                          {mainGame?.metacritic}
                        </span>
                      </Badge>
                      : ""}
                    </div>
                  </div>
                </div>
              }
            </Link>
          </div>
          <h1 className="font-bold text-xl">Check out more lists</h1>
          <div className="flex flex-col flex-wrap md:flex-row items-center justify-between gap-4 z-10 bg-slate-800 md:px-2 lg:px-8 py-4 rounded-xl">
            {gameDashSelection.map((item) => {
              return (
                <Badge key={item.id} icon={HiLightningBolt} color='indigo' className="px-2 lg:px-4 w-2/3 md:w-auto cursor-pointer" onClick={() => handleSelection(item)}>
                  {item.name}
                </Badge>
              )
            })}
          </div>
          <div className="bg-slate-800 flex justify-center p-8 rounded-xl relative z-10">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {firstThree?.map((game) => {
                return (
                  <li key={game.id}>
                    <SingleGame {...game} />
                  </li>
                )
              })}
            </ul>
            <Button pill gradientMonochrome="pink" className='absolute md:w-1/4 -bottom-4' type="button" onClick={() => setMoreGames(!moreGames)}>
              {moreGames ? 'Show Less' : 'Discover More Upcoming'}
            </Button>
          </div>
          <div className="fixed bottom-10 right-10 z-50">
            <DynamicToast />
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard;