import React from "react";
import playstation from "../assets/system-icons/playstation.png";
import nintendo from "../assets/system-icons/nintendo.png";
import xbox from "../assets/system-icons/xbox.png";
import windows from "../assets/system-icons/windows.png";

function Platforms(props) {
  const platformArr = props.parent_platforms;
  const validPlatforms = platformArr?.map((item) => {
    if (item.platform.slug === "pc"){
      return <li key={item.id}><img src={windows} /></li>
    }
    else if (item.platform.slug === "playstation"){
      return <li key={item.id}><img src={playstation} /></li>
    }
    else if (item.platform.slug === "xbox"){
      return <li key={item.id}><img src={xbox} /></li>
    }
    else if (item.platform.slug === "nintendo"){
      return <li key={item.id}><img src={nintendo} /></li>
    }
  })
  return (
    <>
      <ul className="flex">
        {validPlatforms}
      </ul>
    </>
  )
}

export default Platforms;