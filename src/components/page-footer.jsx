import React from "react";
import { Footer, Tooltip } from "flowbite-react";
import logo from '../assets/pixelwikilogo.png';
import react from '../assets/footer/react.png';
import vite from '../assets/footer/vite.png';
import tailwind from '../assets/footer/tailwind.png';
import firebase from '../assets/footer/firebase.png';

function PageFooter() {
  return (
    <>
      <Footer className="bg-slate-800 mt-6" container>
        <div className="w-full">
          <div className="grid w-full justify-between items-center sm:flex sm:justify-between md:flex md:grid-cols-1">
              <div className="flex items-center mb-4 md:mb-0">
                <img width={56} src={logo} />
                <h1 className="text-2xl text-pink-400 tracking-wider ml-0 md:ml-2 font-bold">PixelWiki.io</h1>
              </div>
            <Footer.LinkGroup className="flex gap-4">
              <Footer.Link href="https://github.com/anthonydefine" target="_blank">
                Github
              </Footer.Link>
              <Footer.Link href="https://www.linkedin.com/in/anthony-define/" target="_blank">
                Linked-in
              </Footer.Link>
              <Footer.Link href="https://anthonydefine.github.io/My-Portfolio/" target="_blank">
                Portfolio
              </Footer.Link>
              <Footer.Link href="mailto:defineworkspace00@gmail.com">
                Email
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <div>
              <Footer.Copyright
                by="Anthony Define"
                href="https://anthonydefine.github.io/My-Portfolio/"
                target='_blank'
                year={2023}
              />
              <p className="text-gray-500 text-sm">Data provided by:&nbsp;
                <a className="underline" href="https://rawg.io/">Rawg.io</a>
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-6 sm:mt-0 sm:justify-center">
              <h3 className="text-slate-200 font-bold tracking-wide text-sm">Built with</h3>
              <Tooltip arrow={false} content='React.js'>
                <img src={react} />
              </Tooltip>
              <Tooltip arrow={false} content='Tailwind.css'>
                <img src={tailwind} />
              </Tooltip>
              <Tooltip arrow={false} content='Vite.js'>
                <img src={vite} />
              </Tooltip>
              <Tooltip arrow={false} placement="left" content='Firebase / Firestore'>
                <img src={firebase} />
              </Tooltip>
            </div>
          </div>
        </div>
      </Footer>
    </>
  )
};

export default PageFooter;