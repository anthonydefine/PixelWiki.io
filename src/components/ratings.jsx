import React, { useContext } from "react";
import { AuthContext } from "../auth-context";
import { Button, Badge } from 'flowbite-react';
import { GoDotFill } from "react-icons/go";

function Ratings(props) {
  let totalRatings = props.ratings_count;
  let ratings = props.ratings;
  const exceptional = ratings?.find(item => {
    return item.title === 'exceptional'
  });
  const recommended = ratings?.find(item => {
    return item.title === 'recommended'
  });
  const meh = ratings?.find(item => {
    return item.title === 'meh'
  });
  const skip = ratings?.find(item => {
    return item.title === 'skip'
  });
  let max = ratings?.sort((a, b) => (a.count < b.count) ? 1 : -1);
  const topRating = max?.find(item => {
    return item === max[0];
  });

  let emojiRating;
  if (topRating?.title === "exceptional") {
    emojiRating = <span className="pl-3" role="img" aria-label="direct-hit">🎯</span>;	
  } else if (topRating?.title === "recommended") {
    emojiRating = <span className="pl-3" role="img" aria-label="thumbs-up">👍</span>;
  } else if (topRating?.title === "meh") {
    emojiRating = <span className="pl-3" role="img" aria-label="thumbs-up">😑</span>;
  } else if (topRating?.title === "skip") {
    emojiRating = <span className="pl-3" role="img" aria-label="thumbs-up">👎</span>;
  };

  let exceptionalPercent = Math.ceil(exceptional?.percent / 10) * 10;
  let recommendedPercent = Math.ceil(recommended?.percent / 10) * 10;
  let mehPercent = Math.ceil(meh?.percent / 10) * 10;
  let skipPercent = Math.ceil(skip?.percent / 10) * 10;

  const { addToLibrary } = useContext(AuthContext);

  return (
    <>
      <p className="capitalize font-semibold tracking-wide text-4xl">{topRating?.title}{emojiRating}</p>
      <p className="text-neutral-400 font-thin underline tracking-wider text-sm pt-2">{totalRatings} RATINGS</p>
      <div className="w-2/3 md:w-10/12 flex my-3">
        <Button className="rounded-r-none rounded-l-2xl" gradientDuoTone="greenToBlue" style={{width: `${exceptionalPercent}%`}}>
          <span className="opacity-0">Exceptional</span>
        </Button>
        <Button className="rounded-none peer/recommended" gradientDuoTone="purpleToBlue" style={{width: `${recommendedPercent}%`}}>
          <span className="opacity-0">Recommended</span>
        </Button>
        <Button className="rounded-none peer/meh" gradientDuoTone="redToYellow" style={{width: `${mehPercent}%`}}>
        <span className="opacity-0">Meh</span>
        </Button>
        <Button className="rounded-l-none rounded-r-2xl peer/skip" gradientDuoTone="pinkToOrange" style={{width: `${skipPercent}%`}}>
        <span className="opacity-0">Skip</span>
        </Button>
      </div>
      <ul id="ratingsGrid" className="flex flex-wrap gap-4 my-4">
        <li>
          <GoDotFill size={20} color="green" />
          <span>{exceptional?.title ? exceptional.title : 'Exceptional'}</span>
          <span className="text-neutral-400 font-thin">{exceptional?.count ? exceptional.count : '0'}</span>
        </li>
        <li>
          <GoDotFill size={20} color="blue" />
          <span>{recommended?.title ? recommended.title : 'Recommended'}</span>
          <span className="text-neutral-400 font-thin">{recommended?.count ? recommended.count : '0'}</span>
        </li>
        <li>
          <GoDotFill size={20} color="orange" />
          <span>{meh?.title ? meh.title : 'Meh'}</span>
          <span className="text-neutral-400 font-thin">{meh?.count? meh.count : '0'}</span>
        </li>
        <li>
          <GoDotFill size={20} color="red" />
          <span>{skip?.title ? skip.title : 'Skip'}</span>
          <span className="text-neutral-400 font-thin">{skip?.count ? skip.count : '0'}</span>
        </li>
      </ul>
      <div className="flex flex-col gap-2 md:flex-row items-center justify-between w-full">
        <Button 
          pill 
          gradientMonochrome="pink" 
          className="p-3 w-full md:w-auto"
          onClick={() => addToLibrary(props)}
        >
          Add to Library
        </Button>
        {props.metacritic ?
          <Badge className="p-2 w-full md:w-auto">
            Metacritic {props.metacritic}
          </Badge>
        :
        ""
        }
        
      </div>
      
    </>
  )
}

export default Ratings;