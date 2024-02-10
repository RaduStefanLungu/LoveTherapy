import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import BUDHA_LOGO from '../../resources/budha-rouge-logo.png'
import LT_TEXT from '../../resources/text_love_therapy_nobg.png'

import { PiGenderFemaleBold,PiGenderMaleBold,PiGenderIntersexBold  } from "react-icons/pi";


import { useAuth } from '../../context/AuthContext.js'
import { addError, addUser } from '../../firebase';

export default function Register() {

  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [sex,setSex] = useState("/")
  const [terms,setTerms] = useState(false)
  const [subscription,setSubscription] = useState(false)

  const [error,setError] = useState("")

  const [maleButtonSelected,setMaleButtonSelected] = useState(false)
  const [femaleButtonSelected,setFemaleButtonSelected] = useState(false)
  const [nonBinaryButtonSelected,setNonBinaryButtonSelected] = useState(false)

  const { signup } = useAuth()
  const redirect = useNavigate();

  function handleSexMale(e){
    e.preventDefault()

    try{
      setMaleButtonSelected(true)
      setFemaleButtonSelected(false)
      setNonBinaryButtonSelected(false)
      setSex("M")
    }catch(e){
      setError(e.message)
    }
  }

  function handleSexFemale(e){
    e.preventDefault()
    
    try{
      setFemaleButtonSelected(true)
      setMaleButtonSelected(false)
      setNonBinaryButtonSelected(false)
      setSex("F")
    }catch(e){
      setError(e.message)
    }
  }

  function handleSexNonBinary(e){
    e.preventDefault()
    
    try{
      setFemaleButtonSelected(false)
      setMaleButtonSelected(false)
      setNonBinaryButtonSelected(true)
      setSex("NB")
    }catch(e){
      setError(e.message)
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    
    try{
      if(sex === "/"){
        setError("Veuillez choisir votre sexe !")
        return false
      }
      else{
        const register_data = {
          email: email,
          phone: phone,
          password: password,
          sex : sex,
          terms : terms,
          subscription : subscription
        }
        await signup(register_data.email,register_data.password).then(
          addUser(register_data.email,register_data.phone,register_data.sex,["/","/","/"],register_data.subscription,register_data.terms,false)
        ).catch((e)=>{
          setError(e.message)
        })
        redirect('/profile')
        return true
      }
    }catch(e){
      addError(
        {
          e_message: e.message,
          program_execution: "Failed to execute handleSubmit(e)",
          program_page: "/inscription -> Register",
          program_function_error: `handleSubmit(${e})`,
          user_email : "/"
        }
      )
    }

  }

  return (
    <div>
      <div className='bg_home_image flex flex-col justify-between max-w-screen h-fit min-h-screen'>
        <div className='mt-[30%] md:mt-[15%] lg:mt-[5%] bg-white/0 py-10 px-5'>
          <div className='container mx-auto max-w-[500px]'>

            <Link to={'/'}><img alt='' src={LT_TEXT} className='mx-auto w-[250px]' /></Link>

            <h3 className='text-4xl font-medium presentation_text text-center mb-5 border-b-[0.15rem] border-white/50'>Inscription</h3>

            <p className={`text-red-500 text-center font-bold px-3 py-1 my-3 ${error.length === 0 ? "bg-transparent" : "bg-white" }`}>{error}</p>

            <form className='grid justify-center gap-5 pb-10' onSubmit={handleSubmit}>

              <div className='grid justify-center gap-5'>
                <input required type='email' placeholder='E-mail' onChange={(e)=> setEmail(e.target.value) } className="w-[275px] md:w-[350px] border-[0.15rem] border-black rounded-lg bg-white placeholder:px-2 placeholder:text-black"/>
                <input required type='tel' placeholder='GSM' maxLength='10' minLength='10' pattern="\d{10}" onChange={(e)=> setPhone(e.target.value) } className="w-[275px] md:w-[350px] border-[0.15rem] border-black rounded-lg bg-white placeholder:px-2 placeholder:text-black"/> 
                <input required type='password' placeholder='Mot de passe' minLength='6' onChange={(e)=> setPassword(e.target.value) } className="w-[275px] md:w-[350px] border-[0.15rem] border-black rounded-lg bg-white placeholder:px-2 placeholder:text-black"/>

              </div>
              <div className='flex justify-center gap-10'>
                <button onClick={handleSexFemale} className={`${femaleButtonSelected? "border-white" : "border-transparent"} border-[0.15rem] p-1`}>
                  <PiGenderFemaleBold className='text-5xl text-pink-500 text-center my-auto' />
                </button>
                <button onClick={handleSexMale} className={`${maleButtonSelected? "border-white" : "border-transparent"} border-[0.15rem] p-1`}>
                  <PiGenderMaleBold className='text-5xl text-blue-500 text-center my-auto' />
                </button>
                <button onClick={handleSexNonBinary} className={`${nonBinaryButtonSelected? "border-white" : "border-transparent"} border-[0.15rem] p-1`}>
                  <PiGenderIntersexBold className='text-5xl text-yellow-500 text-center my-auto' />
                </button>
              </div>

              <div className='grid px-10'>
                <div className='flex gap-2'>
                  <input required type='checkbox' onChange={(e)=>{if(e.target.checked){setTerms(true)}}}/>
                  <label className='text-white italic'>j'accepte les <Link to={'/terms-of-service'} className='underline'>Termes et Conditions</Link></label>
                </div>
                <div className='flex gap-2'>
                  <input type='checkbox' onChange={()=>{setSubscription(!subscription)}}/>
                  <label className='text-white italic'>Recevoir des Actualités par E-mail pour les Futurs Événements </label>
                </div>
              </div>

              <div className='grid justify-center'>
                <button type="submit" className='button_1 text-2xl md:text-4xl' >Je rejoins !</button>
              </div>

            </form>

            <img src={BUDHA_LOGO} alt='' className='mx-auto w-[50px]'/>

          </div>
        </div>

        <div className='font-bold text-center pb-2 pt-5'>
          <p className='text-white'>Déjà inscrit? <br/>
            <Link to={'/'} className='text-blue-500 hover:text-blue-300'> Connectez-vous ici !</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
