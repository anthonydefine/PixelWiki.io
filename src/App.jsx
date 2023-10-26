import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './auth-context';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navigation from './components/navigation/navigation';
import PageFooter from './components/page-footer';
import './App.css';
import FullGame from './pages/full-game';
import Dashboard from './pages/home/dashboard';
import GameLibrary from './pages/game-library';


function App() {

  const [showGames, setShowGames] = useState([]);
  const [searchGame, setSearchGame] = useState([]);

  const { setCurrentUser, setCurrentUid, getUserDoc, chosenSelection, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserDoc(user);
        setCurrentUid(user.uid);
      } else {
        setCurrentUser(null)
        console.log('user is signed out')
      }
    })
  });

  
  const api = "41d966cdbddc4d54ae3b6de7781a7821";
  //https://rawg.io/api/games?page=2&key=${api}

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`https://rawg.io/api/${chosenSelection}key=${api}`);
      const jsonResponse = await res.json();
      setShowGames(jsonResponse.results);
      setIsLoading(false);
    };
    fetchData();
  }, [chosenSelection, api]);

  return (
    <>
      <div className='h-screen'>
        <Navigation setSearchGame={setSearchGame} />
        <Routes>
          <Route index exact path='/' element={<Dashboard handleState={showGames} />}/>
          <Route exact path=':gameName' element={<FullGame searchGame={searchGame} handleState={showGames} />}/>
          <Route path='gamelibrary' element={<GameLibrary />}/>
        </Routes>
        <PageFooter />
      </div>
    </>
  )
}

export default App
