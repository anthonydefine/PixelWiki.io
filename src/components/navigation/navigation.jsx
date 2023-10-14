import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth-context";
import { HiSearch, HiOutlineXCircle } from 'react-icons/hi';
import { TextInput, Avatar, Button, Dropdown } from "flowbite-react";
import SearchItem from "./search-item";
import AuthModal from "./auth-modal";
import logo from '../../assets/pixelwikilogo.png';

function Navigation(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const api = "41d966cdbddc4d54ae3b6de7781a7821";

  const { signout, currentUser, setShowAviModal, setShowDisplaynameModal } = useContext(AuthContext);


    const fetchSearch = async (e) => {
      setSearchPhrase(e.target.value);
      const res = await fetch(`https://rawg.io/api/games?search=${searchPhrase}&key=${api}`);
      const jsonResponse = await res.json();
      const jsonResults = jsonResponse.results
      const newFilter = jsonResults?.filter((value) => {
        return value.name.toLowerCase().includes(searchPhrase.toLowerCase());
      });
      if (searchPhrase === '') {
        setSearchResult([])
      } else {
        setSearchResult(newFilter);
        props.setSearchGame(newFilter);
      }
      console.log(newFilter)
    };

    const handleClose = () => {
      setSearchResult([])
      setSearchPhrase('');
    };

  return (
    <>
      <div id="navBar" className="bg-slate-800 shadow-xl flex justify-between items-center gap-4 py-4 px-2 md:px-8">
        <Link className="flex items-center" to={'/'}>
          <img className="w-10" src={logo} />
          <h1 className="text-2xl text-pink-400 tracking-wider ml-2 font-bold hidden lg:block">PixelWiki.io</h1>
        </Link>
        <div className="w-3/5 max-w-lg">
          <TextInput
            id="searchBar"
            className="focus-visible:ring-pink-400"
            icon={HiSearch}
            placeholder="Search for a game..."
            shadow
            type="text"
            value={searchPhrase}
            onChange={fetchSearch}
          />
          {searchResult?.length != 0 && (
            <div id="searchSuggestions" className="z-50 shadow-2xl rounded-xl relative overflow-auto w-5/6">
              <div className="sticky top-0 right-0 left-0">
                <Button gradientDuoTone="pinkToOrange" size='xs' className='z-50 float-right group' onClick={handleClose}>
                  <span className="flex items-center gap-1">
                    <HiOutlineXCircle size={18} />
                    <span className='hidden group-hover:block'>
                      Clear search
                    </span>
                  </span>
                </Button>
              </div>
              <ul className="divide-y-2 divide-black bg-slate-700">
                {searchResult?.slice(0, 15).map((item) => {
                  return (
                    <>
                      
                      <li onClick={handleClose} className="text-slate-500 hover:text-slate-200 p-4 hover:bg-slate-600" key={item.slug}>
                        <SearchItem {...item} />
                      </li>
                    </>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {currentUser ?
          <span className="hidden md:block text-xs">
            Welcome 
            <p className="text-pink-300 text-base font-bold">
              {currentUser.screenName ? currentUser.screenName : currentUser.email}
            </p>
          </span>
          :
          <AuthModal />
          }
          {currentUser ?
          <Dropdown 
            className="bg-slate-700 border-slate-800"
            dismissOnClick={true} 
            renderTrigger={() => 
            <span>
              <Avatar 
                rounded
                bordered
                color='purple'
                img={currentUser.aviUrl ? currentUser.aviUrl : ''}
                className="cursor-pointer rounded-full" 
              />
            </span>
            }
          >
            <Dropdown.Item className="block md:hidden hover:bg-transparent focus:bg-transparent cursor-default">
              <span className="text-slate-200">Welcome</span><br/>
              <span className="text-purple-200 font-bold">{currentUser.screenName ? currentUser.screenName : currentUser.email}</span>
            </Dropdown.Item>
            <Dropdown.Divider className="bg-slate-800 md:hidden" />
            <Dropdown.Item className="text-slate-200 hover:bg-transparent focus:bg-transparent focus:underline">
              <span onClick={() => setShowAviModal(true)}>
                Change Avatar
              </span>
            </Dropdown.Item>
            <Dropdown.Item className="text-slate-200 hover:bg-transparent focus:bg-transparent focus:underline">
              <span onClick={() => setShowDisplaynameModal(true)}>
                Change Username
              </span>
            </Dropdown.Item>
            <Dropdown.Item className="text-slate-200 hover:bg-transparent focus:bg-transparent focus:underline">
              My Library
            </Dropdown.Item>
            <Dropdown.Divider className="bg-slate-800" />
            <Dropdown.Item className="text-slate-200 hover:bg-transparent focus:bg-transparent focus:underline" onClick={signout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          :
          ""
          }
        </div>
      </div>
    </>
  )
}

export default Navigation;