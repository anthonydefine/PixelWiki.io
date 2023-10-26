import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth-context";
import ReleaseDate from "../components/release-date";
import Platforms from "../components/platforms";
import { Rating, Button } from 'flowbite-react';


function SingleGame(props) {

  let genreArr = props.genres;
  let gameName = props.name;
  let gameRef = gameName?.toLowerCase();
  const { addToLibrary } = useContext(AuthContext);

  
  return (
    <>
      <div className="h-full flex flex-col gap-3 text-white bg-slate-600 py-3 px-6 rounded-xl">
        <img className="rounded-3xl max-h-32" src={props.background_image} />
        <Link key={props.id} to={props.name.toLowerCase()} className="text-sm md:text-lg lg:text-2xl font-bold tracking-tight hover:underline">
          <p>
            {props.name}
          </p>
        </Link>
        <Button color="dark" pill size='xs' className='flex items-center' onClick={() => addToLibrary(props)}>
          <p>Add to Library</p>
        </Button>
        <div className="flex justify-between items-center font-normal">
          <div className="flex flex-col gap-3 text-sm">
            <ReleaseDate props={props?.released} />
            <ul className="grid grid-rows-2 gap-2">
              {genreArr?.slice(0,2).map((item) => {
                return (
                  <li key={item.id}>
                    <Button className='truncate' pill color='dark' size='xs'>
                      {item.name}
                    </Button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="text-black">
            <Button pill color='dark' size='xs'>
              <Rating>
                <Rating.Star></Rating.Star>
                <p className="text-white ml-2">
                  {props.rating}
                </p>
              </Rating>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleGame;