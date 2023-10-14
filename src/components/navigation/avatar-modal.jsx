import React, { useContext } from "react";
import { AuthContext } from "../../auth-context";
import { Button, Avatar, Radio, Label } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import './modal.css';


function AvatarModal() {

  const { setShowAviModal, aviUrl, setAviUrl, changeAvatar } = useContext(AuthContext);

  const aviArr = [
    {id: 1, url: 'https://i.ibb.co/YWLWxtw/controller.png', alt: 'Controller Avatar'},
    {id: 2, url: 'https://i.ibb.co/hXvt2rB/llama.png', alt: 'Fortnite Llama Avatar'},
    {id: 3, url: 'https://i.ibb.co/fndtxTw/mario.png', alt: 'Super Mario Avatar'},
    {id: 4, url: 'https://i.ibb.co/WvMhv9T/mcskeleton.png', alt: 'Minecraft Skeleton Avatar'},
    {id: 5, url: 'https://i.ibb.co/T044cCK/mczombie.png', alt: 'Minecraft Zombie Avatar'}
  ];

  const handleSubmit = (e) => {
    changeAvatar(e);
    setShowAviModal(false);
  };


  return (
    <>
      <div className="modalBackground">
        <div className="bg-slate-700 modalContainer text-slate-200 w-10/12 lg:w-1/2 h-2/3 md:h-1/3">
          <div className="flex justify-between items-center border-b-2 border-slate-500 pb-4">
            <h2 className="text-2xl font-bold tracking-wider">Change your avatar</h2>
            <Button color='dark' onClick={() => setShowAviModal(false)}>
              <HiX />
            </Button>
          </div>
          <div id="modalBody" className="flex justify-center items-center w-full h-full">
            <form onSubmit={handleSubmit} className="relative w-full h-full flex justify-center">
              <div className="flex flex-col items-center overflow-y-auto h-4/5 md:h-full md:flex-row gap-8 w-full">
                {aviArr.map((item) => {
                  return (
                    <div key={item.id} className="flex items-center gap-2">
                      <Radio
                        id="avatar"
                        name="avatar-selection"
                        value={item.url}
                        checked={aviUrl == item.url}
                        onChange={(e) => setAviUrl(e.target.value)}
                      />
                      <Label htmlFor="avatar">
                        <Avatar rounded size='lg' img={item.url} alt={item.alt} />
                      </Label>
                    </div>
                  )
                })}
              </div>
              <Button pill gradientMonochrome="pink" className='w-full md:w-1/2 lg:w-1/3 absolute bottom-16 md:bottom-0 md:right-0' type='submit'>
                Update Avatar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvatarModal;