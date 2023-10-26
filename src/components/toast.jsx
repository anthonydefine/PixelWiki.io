import React, { useContext } from 'react';
import { AuthContext } from '../auth-context';
import { Toast } from 'flowbite-react';
import { HiUserCircle, HiFire } from 'react-icons/hi';

export default function DynamicToast() {

  const { showToast, setShowToast, toastMessage, userToast } = useContext(AuthContext);

  return (
    <>
      {showToast && (
        <Toast className='bg-pink-200 border-2 border-pink-500 w-96 shadow-2xl z-50'>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-500">
            {userToast ? <HiUserCircle className="h-5 w-5" /> : <HiFire className="h-5 w-5" /> }
          </div>
          <div className="ml-3 text-sm font-normal text-slate-200">
            {toastMessage}
          </div>
          <Toast.Toggle className='bg-pink-600 hover:bg-pink-500' onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
    </>
  )
};