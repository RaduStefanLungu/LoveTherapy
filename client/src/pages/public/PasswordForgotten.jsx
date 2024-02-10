import React, { useState } from 'react'

import {Link, useNavigate} from 'react-router-dom'

import BUDHA_LOGO from '../../resources/budha-rouge-logo.png'
import LT_TEXT from '../../resources/text_love_therapy_nobg.png'


import { useAuth } from '../../context/AuthContext.js'

export default function PasswordForgotten() {
    const [error,setError] = useState('')
    const [successMessage,setSuccessMessage] = useState('')
    const { resetPassword } = useAuth();
    const redirect = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            await resetPassword(document.getElementById('email').value).then(
                setSuccessMessage('Vous avez réussi à réinitialiser votre mot de passe avec succès.'),
            )
            setTimeout(redirect('/'),2000)
            
        }catch(err){
            setError(err.message)
        }
    }

    return(
        <div>
          <div className='bg_home_image flex flex-col justify-between max-w-screen h-fit min-h-screen'>
            <div className='mt-[30%] md:mt-[15%] lg:mt-[5%] bg-white/0 py-10 px-5'>
              <div className='container mx-auto max-w-[500px]'>
    
                <Link to={'/'}><img alt='' src={LT_TEXT} className='mx-auto w-[250px]' /></Link>
    
                <h3 className='text-4xl font-medium presentation_text text-center'>Mot de pass oublié</h3>
    
    
                <form className='grid justify-center gap-5 pb-10' onSubmit={handleSubmit}>
                  <p className='text-center text-white bg-red-500'> {error} </p>
                  <p className='text-center text-white bg-green-500'> {successMessage} </p>
    
                  <input required type='email' id='email' placeholder="E-mail" className="mx-auto w-[275px] md:w-[350px] border-[0.15rem] border-black rounded-lg bg-white placeholder-black placeholder:px-2 placeholder:text-black" />
    
                  <div className='grid justify-center'>
                    <button className='button_1 text-2xl md:text-4xl'  type='submit'>Envoyer</button>
                  </div>
    
                </form>
    
                <img src={BUDHA_LOGO} alt='' className='mx-auto w-[50px]'/>
    
              </div>
            </div>
    
            <div className='font-bold text-center pb-2 pt-5'>
              <p className='text-white'>Pas encore inscrit ? <br/>
                <Link to={'/inscription'} className='text-blue-500 hover:text-blue-300'> Rejoignez la thérapie ici !</Link>
              </p>
            </div>
    
          </div>
        </div>
      )
}
