import React, { useRef, useState } from 'react'

import {Link, useNavigate,useLocation} from 'react-router-dom'

import BUDHA_LOGO from '../../resources/budha-rouge-logo.png'
import LT_TEXT from '../../resources/text_love_therapy_nobg.png'
import GOOGLE_LOGO from '../../resources/google_auth_logo.png'
import FACEBOOK_LOGO from '../../resources/facebook_auth_logo.png'

import { useAuth } from '../../context/AuthContext.js'
import { addUser, getUserDocument } from '../../firebase.js'

export default function HomePage() {

  

  return (
    <div className="App">
        <HeroCard></HeroCard>
    </div>
  )
}


const HeroCard = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,loginWithGoogle,loginWithFacebook } = useAuth();

  const [error,setError] = useState("");
  const [loading,setLoading] = useState("");

  const redirect = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setError('')
        setLoading(true)
        const result = await login(emailRef.current.value, passwordRef.current.value)


        // If there's a state.from, redirect to that path after successful login
        if (location.state && location.state.from) {
          redirect(location.state.from);
        } else {
          // If there's no state.from, redirect to a default path (e.g., dashboard)
          redirect('/profile');
        }

    }   
    catch(e){
        setError("Failed to sign in")
        console.log(e);
    }
    setLoading(false)
  }

  async function handleGoogleLogin(e) {
    e.preventDefault()

    try{
      const result = await loginWithGoogle()
      //create user in user_data if it doesn't exist !
      const user_document = await getUserDocument(result.user.email)
      if (user_document === null){
        await addUser(result.user.email,"/","/",["/","/","/"],true,true,false)
        redirect('/profile')
      }
      else{
        // If there's a state.from, redirect to that path after successful login
        if (location.state && location.state.from) {
          redirect(location.state.from);
        } else {
          // If there's no state.from, redirect to a default path (e.g., dashboard)
          redirect('/profile');
        }
      }
      
      
    }catch(e){
      console.log(e);
    }
  }

  async function handleFacebookLogin(e) {
    e.preventDefault()
    
    // TODO : DO NOT CREATE USER IN USER_DATA IF ERROR FROM FACEBOOK !!!!! 

    try{
      const result = await loginWithFacebook()
      //create user in user_data if it doesn't exist !
      const user_document = await getUserDocument(result.user.email)
      if (user_document === null){
        await addUser(result.user.email,"/","/",["/","/","/"],true,true,false)
        redirect('/profile')
      }
      else{
        // If there's a state.from, redirect to that path after successful login
        if (location.state && location.state.from) {
          redirect(location.state.from);
        } else {
          // If there's no state.from, redirect to a default path (e.g., dashboard)
          redirect('/profile');
        }
      }
    }catch(e){
      if(e.code === "auth/popup-closed-by-user"){
        console.log(e.code);
      }
      else{
        setError(e.message)
      }
    }
  }

  return(
    <div>
      <div className='bg_home_image flex flex-col justify-between max-w-screen h-fit min-h-screen'>
        <div className='mt-[30%] md:mt-[15%] lg:mt-[5%] bg-white/0 py-10 px-5'>
          <div className='container mx-auto max-w-[500px]'>

            <Link to={'/'}><img alt='' src={LT_TEXT} className='mx-auto w-[250px]' /></Link>

            {/* <p className=' text-lg font-bold text-center py-3 md:text-xl md:py-5 presentation_text'>
              Mala vous offre <br/> l'amour et un shot gratuit !
            </p> */}
            

            <h3 className='text-4xl font-medium presentation_text text-center'>Se connecter</h3>

            <div className='pt-2 flex justify-center gap-10'>
              
              <button className=' bg-white rounded-full' onClick={handleGoogleLogin}>
                <img  alt='' src={GOOGLE_LOGO} className='w-[45px] '/>
              </button>

              <button className=' bg-white rounded-full' onClick={handleFacebookLogin}>
                <img  alt='' src={FACEBOOK_LOGO} className='w-[45px] '/>
              </button>
            </div>

            <div className='flex justify-center py-2'>

              <div className='w-[150px] my-auto border-b-2 border-white/50'></div>
              <p className='text-gray-200 text-center font-medium presentation_text px-5'> ou </p>
              <div className='w-[150px] my-auto border-b-2 border-white/50'></div>

            </div>


            <form className='grid justify-center gap-5 pb-10' onSubmit={handleSubmit}>
              <p className='text-center text-white bg-red-500'> {error} </p>

              <input required type='email' ref={emailRef} id='email' placeholder="E-mail" className="w-[275px] md:w-[350px] border-[0.15rem] border-black rounded-lg bg-white placeholder-black placeholder:px-2 placeholder:text-black" />
              <input required type='password' ref={passwordRef} id='password' placeholder="Mot de passe" className="w-[275px] md:w-[350px] border-[0.15rem] border-black rounded-lg bg-white placeholder-black placeholder:px-2 placeholder:text-black" />
              

              <div className='grid justify-center'>
                <button className='button_1 text-2xl md:text-4xl' disabled={loading} type='submit'>Let's Party !</button>
                <Link to={'/changement-mot-de-pass'} className='text-blue-500 font-bold text-center text-sm py-2 '>
                  Mot de pass oublié?
                </Link>
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