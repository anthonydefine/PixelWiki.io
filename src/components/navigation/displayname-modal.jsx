import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth-context";
import { Button, TextInput, Label } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import './modal.css';


function DisplaynameModal() {

  const { setShowDisplaynameModal, displayName, setDisplayName, changeDisplayname } = useContext(AuthContext);

  const handleSubmit = (e) => {
    changeDisplayname(e);
    setShowDisplaynameModal(false);
  };


  return (
    <>
      <div className="modalBackground">
        <div className="bg-slate-700 modalContainer w-10/12 lg:w-1/2 h-1/2 md:h-1/3">
          <div className="flex justify-between items-center text-slate-200 border-b-2 border-slate-500 pb-4">
            <h2 className="text-2xl font-bold tracking-wider">Change your Username</h2>
            <Button color='dark' onClick={() => setShowDisplaynameModal(false)}>
              <HiX />
            </Button>
          </div>
          <div id="modalBody" className="flex justify-center items-center w-full h-full">
            <form onSubmit={handleSubmit} className="relative w-full h-full flex justify-center items-center">
              <div className="pb-8 w-full flex flex-col items-center">
                <div className="mb-2 place-self-start">
                  <Label
                    className="text-slate-200"
                    htmlFor="displayname"
                    value="Username:"
                  />
                </div>
                <TextInput
                  id="displayname"
                  className="w-5/6 md:w-96 bg-slate-800"
                  placeholder="RozTopics (max 15 characters)"
                  maxLength={15}
                  required
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <Button pill gradientMonochrome="pink" className='w-full md:w-1/2 lg:w-1/3 absolute bottom-0 right-0' type='submit'>
                Update Username
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplaynameModal;