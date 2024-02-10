import React, { useState } from 'react'

import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';


import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";

export default function Header() {
  return (
    <header className='bg-black flex justify-between py-3 px-2'>
        <Link to={'/'} className='flex'>
            <div>
              {/* <img alt='' src={}/>
              <img alt='' src={}/> */}
            </div>
        </Link>
        <div className=' lg:hidden'>
            <DropdownMenu/>
        </div>
        <div className='hidden lg:flex mb-auto gap-10 hover:border-0'>
            <div className=' m-auto grid text-center p-0'>
                <Link to={'/'} className='button_golden_border text-xl xl:text-2xl'>Accueil</Link>
            </div>
            <div className='m-auto grid text-center p-0'>
                <Link to={'/a-propos'} className='button_golden_border text-xl xl:text-2xl'>A propos</Link>
            </div>
            <div className='m-auto grid text-center p-0'>
                <Link to={'/contact'} className='button_golden_border text-xl xl:text-2xl'>Contact</Link>
            </div>
            <div className=' m-auto grid text-center p-0'>
                <Link to={'/connection'} className='button_golden_filled text-xl xl:text-2xl'>Connection</Link>
            </div>
          </div>
    </header>
  )
}


const DropdownMenu = () => {
    return (
      <Menu animate={{
        mount: { x:0 },
        unmount: { x:125 }
      }}>
        <MenuHandler>
          <Button className='text-white bg-transparent shadow-transparent p-0'>
            <GiHamburgerMenu className='text-4xl'/>
          </Button>
        </MenuHandler>
        <MenuList className='grid rounded-none bg-black/90 border-0 hover:border-0 w-screen h-screen'>
          <div className='grid mb-auto gap-10 hover:border-0'>
            <MenuItem className=' m-auto grid text-center p-0 w-[250px] md:w-[350px]'>
                <Link to={'/'} className='button_golden_border text-2xl md:text-3xl'>Accueil</Link>
            </MenuItem>
            <MenuItem className='m-auto grid text-center p-0 w-[250px] md:w-[350px]'>
                <Link to={'/a-propos'} className='button_golden_border text-2xl md:text-3xl'>A propos</Link>
            </MenuItem>
            <MenuItem className='m-auto grid text-center p-0 w-[250px] md:w-[350px]'>
                <Link to={'/contact'} className='button_golden_border text-2xl md:text-3xl'>Contact</Link>
            </MenuItem>
            <MenuItem className=' m-auto grid text-center p-0 w-[250px] md:w-[350px]'>
                <Link to={'/connection'} className='button_golden_filled text-2xl md:text-3xl'>Connection</Link>
            </MenuItem>
          </div>
        </MenuList>
      </Menu>
    );
  }