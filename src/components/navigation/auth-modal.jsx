import React, { useState, useContext } from "react";
import { Button, Modal, Tabs, Label, TextInput } from 'flowbite-react';
import { AuthContext } from "../../auth-context";
import { HiUserCircle } from "react-icons/hi";

function AuthModal() {
  const [openModal, setOpenModal] = useState();
  const modalProps = { openModal, setOpenModal };

  const { createUser, loginUser, email, setEmail, password, setPassword } = useContext(AuthContext);

  return (
    <>
      <Button className='md:px-4' pill size='xs' gradientMonochrome="pink" onClick={() => modalProps.setOpenModal('default')}>
        Sign-in
      </Button>
      <Modal dismissible show={modalProps.openModal === 'default'} onClose={() => modalProps.setOpenModal(undefined)}>
        <Modal.Header>
          Sign up or Log in
        </Modal.Header>
        <Modal.Body>
          <div>
            <Tabs.Group theme='dark'>
              <Tabs.Item
                active
                icon={HiUserCircle}
                title='Sign-up'
                className="tabItem"
              >
                <form id="signupForm" onSubmit={createUser} className="flex max-w-md flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email1"
                        value="Your email"
                      />
                    </div>
                    <TextInput
                      id="email1"
                      placeholder="name@gmail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="password1"
                        value="Your password"
                      />
                    </div>
                    <TextInput
                      id="password1"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <Button gradientMonochrome="pink" type="submit">
                    Sign-up
                  </Button>
                </form>
              </Tabs.Item>
              <Tabs.Item
                icon={HiUserCircle}
                title='Log-in'
                className="tabItem text-pink-500"
              >
                <form id="loginForm" onSubmit={loginUser} className="flex max-w-md flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email2"
                        value="Your email"
                      />
                    </div>
                    <TextInput
                      id="email2"
                      placeholder="name@flowbite.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="password2"
                        value="Your password"
                      />
                    </div>
                    <TextInput
                      id="password2"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <Button gradientMonochrome="pink" type="submit">
                    Log-in
                  </Button>
                </form>
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AuthModal;


