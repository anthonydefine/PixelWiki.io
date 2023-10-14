import React from "react";
import playstation from "../assets/system-icons/playstation.png";
import xbox from "../assets/system-icons/xbox.png";
import nintendo from "../assets/system-icons/nintendo.png";
import windows from "../assets/system-icons/windows.png";
import steam from "../assets/system-icons/steam.png";
import gog from "../assets/system-icons/gog.png";
import epic from "../assets/system-icons/epic.png";
import apple from "../assets/system-icons/apple.png";
import googleplay from "../assets/system-icons/googleplay.png";

function Stores(props) {
  const storeArr = props.stores;

  let storeLogo = storeArr?.map(item => {
    if (item.store.slug === 'playstation-store') {
      return <li key={item.id}> <img src={playstation}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    }  else if (item.store.slug === 'xbox-store') {
      return <li key={item.id}> <img src={xbox}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    } else if (item.store.slug === 'nintendo') {
      return <li key={item.id}> <img src={nintendo}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    } else if (item.store.slug === 'pc') {
      return <li key={item.id}> <img src={windows}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    } else if (item.store.slug === 'steam') {
      return <li key={item.id}> <img src={steam}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    } else if (item.store.slug === 'apple-appstore') {
      return <li key={item.id}> <img src={apple}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    } else if (item.store.slug === 'gog') {
      return <li key={item.id}> <img src={gog}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    } else if (item.store.slug === 'epic-games') {
      return <li key={item.id}> <img src={epic}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    } else if (item.store.slug === 'google-play') {
      return <li key={item.id}> <img src={googleplay}/><a href={`http://${item.store.domain}`} target="_blank">{item.store.name}</a></li>
    }
  })
  
  return (
    <>
    <h2 className="text-white text-xl text-center pb-4">Where to buy</h2>
      <ul id="storeList" className="grid grid-cols-2 gap-4">
        {storeLogo}
      </ul>
    </>
  )
}

export default Stores;