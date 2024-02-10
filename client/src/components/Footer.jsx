import React from 'react'
import { Link } from 'react-router-dom'

import PWS_LOGO from '../resources/Pro-Web-Solutions-logo-1000x300-white-bg.png'

export default function Footer() {
  return (
    <footer className='bg-black min-h-[100px] grid gap-3 justify-center py-3'>

        <div id='powered by pws' className='grid'>

          <h3 className='text-white'>
              Powered by
          </h3>

          <a href='https://www.prowebsolutions.online/#/fr/home' className=''><img className='max-w-[250px]' alt='' src={PWS_LOGO}/></a>

        </div>

        <div className='flex'>
          <h3 className='text-white/70 text-center'>
              Voir 
          </h3>
          <a href='/terms-of-service' className='text-blue-500'>Termes et Conditions</a>
        </div>

    </footer>
  )
}
