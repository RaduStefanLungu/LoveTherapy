import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

import { FaUser,FaPowerOff } from "react-icons/fa";
import { FaCircleXmark,FaCircleCheck  } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { BsBellFill  } from "react-icons/bs";
import { HiMiniXMark } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { PiGenderFemaleBold,PiGenderMaleBold,PiGenderIntersexBold  } from "react-icons/pi";


import LT_TEXT from '../../resources/text_love_therapy_nobg.png'


import { addError, getCountdownTime, getMatchDocumentByPerson, getMatchDocumentByPersonID, getUserCaracteristics, getUserDocument, updateUser } from '../../firebase';


import {useNavigate} from 'react-router-dom'

import BUDHA_LOGO from '../../resources/budha-rouge-logo.png'

import QRCodeGenerator from '../../components/QRCodeGenerator.jsx';
import { getBotCaracteristics, getBotDocumentByID, make_matching, random_array_of_int, random_stuff } from '../../firebase_admin.js';

export default function UserProfile() {

  const { currentUser, logout } = useAuth()

  const [userDocumentId,setUserDocumentId] = useState('')
  const [userPhone,setUserPhone] = useState('')
  const [userSubscription,setUserSubscription] = useState()
  const [userSex,setUserSex] = useState('')
  const [userCaracters,setUserCaracters] = useState([])
  const [userAccountCompleted,setUserAccountCompleted] = useState()
  const [userEmail,setUserEmail] = useState("")
  const [userNotifications,setUserNotifications] = useState([])
  const [userMatchId,setUserMatchId] = useState('')                     // user to be matched with
  const [userMatchSex,setUserMatchSex] = useState('')                     // user sex to be matched with

  const [matchedCaracteristics,setMatchedCaracteristics] = useState([])

  const [countdownTime,setCountdownTime] = useState('31/12/2024-00:00')

  const [timeUp,setTimeUp] = useState(false)


  const redirect = useNavigate()


  // fill user data + timer
  useEffect(() => {

    getUserDocument(currentUser.email)
    .then(
      (fetchedData) => {
        setUserDocumentId(fetchedData.id)
        setUserPhone(fetchedData.phone_number)
        setUserSubscription(fetchedData.newsletter_subscription)
        setUserSex(fetchedData.sex)
        setUserCaracters(fetchedData.caracteristics)
        setUserAccountCompleted(fetchedData.account_completed)
        setUserEmail(fetchedData.email)
        setUserNotifications(fetchedData.notifications)
        setUserMatchId(fetchedData.my_match_id)
        setUserMatchSex(fetchedData.my_match_sex)

        if(fetchedData.my_match_id !== '/'){
          getUserCaracteristics(fetchedData.my_match_id).then(
            (response) => {
              if(response === null || response === undefined){
                getBotCaracteristics(fetchedData.my_match_id).then(
                  (response) => {
                    setMatchedCaracteristics(response)
                  }
                )   
              }
              else{
                setMatchedCaracteristics(response)
              }
              }
            )
        }

      }
    ).catch((e) => {
      console.log(e);
      addError(
        {
          e_message: e.message,
          program_execution: "Failed to execute firebase.getUserDocument(currentUser.email) => returned null",
          program_page: "/profile ->  UserProfile",
          program_function_error: `getUserDocument(${currentUser.email})`,
          user_email : currentUser.email
        }
      )
      redirect('/')
    })

    getCountdownTime().then(
      (fetchedData) => {
        setCountdownTime(fetchedData)
      }
    ).catch((e) => {
      console.log(e);
    })

  },[])


  const [openSettings,setOpenSettings] = useState(false)
  const [openNotifications,setOpenNotifications] = useState(false)


  async function handleLogout(e){
      e.preventDefault()

      try {
          await logout()
          redirect('/')
      } catch{
        console.log(e);
        addError(
          {
            e_message: e.message,
            program_execution: "Failed to execute handleLogout(e)",
            program_page: "/profile ->  UserProfile",
            program_function_error: `handleLogout(${e})`,
            user_email : currentUser.email
          }
        )
      }
  }

  function numberOfUnseenNotifications(){
    let count = 0
    userNotifications.forEach((notif) =>{
      if(!notif.seen){
        count = count + 1
      }
    })
    return count
  }


  return(
    <div>
      <div className='bg_home_image flex flex-col justify-between w-screen h-fit min-h-screen'>
        <div className=' min-h-screen w-screen relative'>
          <div className='container mx-auto max-w-[500px] min-h-screen flex flex-col'>
            
            <div className='bg-black/30 pb-10 rounded-b-full'>

              <div className='relative'>
                <FaUser className={`mb-5 text-6xl mx-auto bg-black/30 p-2 rounded-full ${userSex === "M"?"text-blue-500":userSex==="F"?'text-pink-300':userSex==="NB"?"text-yellow-500":"text-white"}`}/>
                {
                  userAccountCompleted?<FaCircleCheck className='absolute top-1/2 left-1/2 my-auto text-2xl text-green-700'/>:<FaCircleXmark className='absolute top-1/2 left-1/2 my-auto text-2xl text-red-700'/>
                }
              </div>
              
              <div>

                <p className='text-white text-center'>Utilisez votre caméra pour scanner le QR-Code</p>

              </div>

              <div className='grid justify-center w-[200px] h-[200px] mx-auto rounded-full bg-black/20 shadow-lg overflow-hidden'>
                <img alt='' src={LT_TEXT} className={`my-auto ${timeUp?'hidden':'block'}`}/>
                <div className={`my-auto ${timeUp?'block':'hidden'}`} >
                  {
                    userMatchId.length > 0 ? <QRCodeGenerator dataToEncode={`${window.location.origin}/profile/${userDocumentId}`} codeColor={'#FFFFFF'} backgroundColor={'#00000011'} /> : <></>
                  }
                </div>
              </div>

              <h3 className='pb-5 pt-2 text-2xl font-medium presentation_text text-center'>
                {
                  userEmail.split("@")[0]
                }
              </h3>

              <div className='pt-2 flex justify-center gap-20 px-10 md:px-20'>
                
                {/* <button onClick={handleLogout} className='mb-auto text-3xl text-gray-500 bg-white border-[0.15rem] border-gray-500 rounded-full p-2  '>
                  <FaPowerOff/>
                </button> */}

                <div className=' grid relative'>
                  <p className={`${numberOfUnseenNotifications()>0?"block":"hidden"} absolute bottom-2/3 -right-2 text-white bg-red-500 px-2 py-0 rounded-full`}>{numberOfUnseenNotifications()}</p>
                  <button onClick={()=>{setOpenNotifications(true)}} className='text-3xl text-gray-500 bg-white border-[0.15rem] border-gray-500 rounded-full p-2' >
                    <BsBellFill/>
                  </button>
                </div>

                {/* <div className='grid relative'>
                  <p className='absolute bottom-1/3 -right-2 text-white bg-red-500 px-2 py-0 rounded-full'>{numberOfUnseenNotifications()}</p>
                  <button onClick={()=>{setOpenNotifications(true)}} className='mt-10 text-3xl text-gray-500 bg-white border-[0.15rem] border-gray-500 rounded-full p-2' >
                    <BsBellFill/>
                  </button>
                </div> */}

                <button onClick={()=>{setOpenSettings(true)}} className='mb-auto text-3xl text-gray-500 bg-white border-[0.15rem] border-gray-500 rounded-full p-2  '>
                  <CgProfile/>
                </button>

              </div>

            </div>

            <div className="">

              <div className={`${timeUp?"hidden":"block"}`}>
                <h3 className='text-xl text-center text-white'>La thérapie commence bientôt !</h3>
                <div className='text-white text-center text-xl'>

                  <CountdownTimer targetDate={countdownTime} timeUpRef={[timeUp,setTimeUp]}/>
                  {/* ATTENTION C"EST 1h plus tard qu'on montre */}

                </div>
              </div>

              {timeUp?
                <div className='grid justify-center text-white bg-black/30 py-10'>
                  <h2 className='font-bold text-2xl px-5 text-center'>Description de la personne à trouver : </h2>
                  <div className='px-5 py-5 grid justify-center'>
                    {
                      matchedCaracteristics.map((value,key) => {
                        return(
                          <p key={key} className='w-[250px] w-max-screen py-1 p-2'>
                            {key+1}. {value}
                          </p>
                        )
                      })
                    }
                  </div>
                </div>
                :<></>}

            </div>

            <div id='sponsors' className='mt-auto flex justify-center'>
              <img src={BUDHA_LOGO} alt='' className='w-[50px]'/>
            </div>

          </div>

          <div className={`${openSettings?"block":"hidden"} absolute top-0`}>
            <SettingsView DisconnectHandler={handleLogout} OpenReference={[openSettings,setOpenSettings]} Email={userEmail} Phone={userPhone} Subscription={userSubscription} Sex={userSex} Caracters={userCaracters} AccountCompleted={userAccountCompleted}
            MyMatchSex={userMatchSex} DocumentID={userDocumentId} TimeUp={timeUp}/>
          </div>
          
          <div className={`${openNotifications? "block" : "hidden"} absolute top-0 `}>
            <NotificationsView OpenReference={[openNotifications,setOpenNotifications]} Notifications={userNotifications} DocumentID={userDocumentId}/>
          </div>

        </div>
      </div>
    </div>
  )
}


const SettingsView = ({TimeUp,DisconnectHandler,OpenReference,Email,Phone,Subscription,Sex,MyMatchSex,Caracters,AccountCompleted,DocumentID}) => {


  const [changedProfile,setChangedProfile] = useState(false)

  const [newPhone,setNewPhone] = useState("")
  const [caracter1,setCaracter1] = useState("")
  const [caracter2,setCaracter2] = useState("")
  const [caracter3,setCaracter3] = useState("")
  const [newSex,setNewSex] = useState("/")
  const [newMatchSex,setNewMatchSex] = useState("/")
  const [newSubscription,setNewSubscription] = useState(undefined)

  const [error,setError] = useState('')
  const [successfullSave,setSuccessfullSave] = useState('')


  // buttons state
  const [maleButtonSelected,setMaleButtonSelected] = useState(false)
  const [femaleButtonSelected,setFemaleButtonSelected] = useState(false)
  const [nonBinaryButtonSelected,setNonBinaryButtonSelected] = useState(false)

  const [matchMaleButtonSelected,setMatchMaleButtonSelected] = useState(false)
  const [matchFemaleButtonSelected,setMatchFemaleButtonSelected] = useState(false)
  const [matchNonBinaryButtonSelected,setMatchNonBinaryButtonSelected] = useState(false)


  useEffect(() =>{
    // activate or deactivate 'Save' button
    if(caracter1.length ===0 && caracter2.length ===0 && caracter3.length ===0 && newPhone.length ===0 && newSex ==="" && newMatchSex==="/" && newSubscription === Subscription) {
      setChangedProfile(false)
    }
    else{
      setChangedProfile(true)
    }
  })

  useEffect(() => {
    // preset if my_match_sex is already chosen
    switch (MyMatchSex) {
      case "F":
        setMatchFemaleButtonSelected(true)
        break;
      case "M":
        setMatchMaleButtonSelected(true)
        break;
      case "NB":
        setMatchNonBinaryButtonSelected(true)
        break;
      default:
        break;
    }
  },[MyMatchSex])

  useEffect( () => {
    if(newSubscription === undefined && Subscription !== undefined){
      setNewSubscription(Subscription)
    }
  },[Subscription])

  async function handleSauvegarder(e){
    e.preventDefault()

    const myData = {
      phone_number : Phone,
      caracteristics : Caracters,
      sex: Sex,
      my_match_sex : MyMatchSex,
      account_completed : AccountCompleted,
      newsletter_subscription : Subscription
    }

    // rules to change to update the new values
    if(newPhone.length === 10){
      myData.phone_number=newPhone
    }
    if(caracter1.length >= 1){
      myData.caracteristics[0] = caracter1
    }
    if(caracter2.length >= 1){
      myData.caracteristics[1] = caracter2
    }
    if(caracter3.length >= 1){
      myData.caracteristics[2] = caracter3
    }
    if(["/"," ",""].includes(Sex) && !['','/',' '].includes(newSex)){
      myData.sex = newSex
    }
    if(!['','/',' '].includes(newMatchSex)){
      myData.my_match_sex = newMatchSex
    }
    
    if(newSubscription !== Subscription){
      myData.newsletter_subscription = newSubscription
    }

    // rule for the account_completed to be true
    if(myData.account_completed===false && !myData.caracteristics.includes('/') && myData.sex !=='/' && myData.phone_number !== '/' ){
      myData.account_completed = true
    }

    try{
      await updateUser(DocumentID,myData).then(
        ()=>{
          setSuccessfullSave('Vos données ont été sauvegardées!')
          
        }
      )
    }catch(e){
      setError(e.message)
    }

  }

  function handleClose(e){
    e.preventDefault()

    //reset all
    setNewPhone("")
    setCaracter1("")
    setCaracter2("")
    setCaracter3("")
    setNewSex("")
    setMaleButtonSelected(false)
    setFemaleButtonSelected(false)
    setNonBinaryButtonSelected(false)
    // clearDropdownSelection(e)
    OpenReference[1](false)

  }

  function handleSexMale(e){
    e.preventDefault()

    try{
      setMaleButtonSelected(true)
      setFemaleButtonSelected(false)
      setNonBinaryButtonSelected(false)
      setNewSex("M")
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
      setNewSex("F")
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
      setNewSex("NB")
    }catch(e){
      setError(e.message)
    }
  }

  function handleMatchPreferencesM(e){
    e.preventDefault()

    setNewMatchSex("M")

    setMatchMaleButtonSelected(true)
    setMatchFemaleButtonSelected(false)
    setMatchNonBinaryButtonSelected(false)

  }

  function handleMatchPreferencesF(e){
    e.preventDefault()

    setNewMatchSex("F")

    setMatchMaleButtonSelected(false)
    setMatchFemaleButtonSelected(true)
    setMatchNonBinaryButtonSelected(false)

  }

  function handleMatchPreferencesNB(e){
    e.preventDefault()

    setNewMatchSex("NB")

    setMatchMaleButtonSelected(false)
    setMatchFemaleButtonSelected(false)
    setMatchNonBinaryButtonSelected(true)

  }

  const handleSubscription = (event) => {
    setNewSubscription(event.target.checked)
  }

  return(
    <div className={`bg-black/70 text-white h-screen w-screen relative`}>

      <div className='flex flex-col justify-center gap-20 h-screen max-h-screen overflow-auto w-screen max-w-[500px] mx-auto'>

        <div>
          <h3 className='text-2xl font-bold text-center'>Paramètres</h3>
          <p className={`${AccountCompleted?'hidden':'block'} text-center text-gray-500`}>Veuillez compléter votre profil pour pouvoir matcher</p>
        </div>
        <form className=' max-w-[500px] w-screen' onSubmit={handleSauvegarder}>
          <div className='grid gap-5 py-5 px-5 mx-auto'>
            
            <div className='grid overflow-hidden'>
              <label className='uppercase text-xl px-5 py-1'>Email</label>
              <input className='px-5 py-2 bg-gradient-to-r rounded-full bg-gray-200 text-black ' value={Email} disabled></input>
            </div>

            <div className='grid'>
              <label className='uppercase text-xl px-5'>GSM</label>
              <input type='tel' maxLength='10' pattern="\d{10}" className='px-5 py-2 bg-gradient-to-r rounded-full bg-gray-200 text-black ' placeholder={Phone} onChange={(e)=>{setNewPhone(e.target.value)}}></input>
            </div>

            <div className={`${["/",""," "].includes(Sex)?"block":"hidden"} grid`}>
              <label className='uppercase text-xl px-5'>Sexe</label>
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
            </div>

            <div className={`${TimeUp?'hidden':'block'} grid`}>
              <label className='uppercase text-xl px-5'>Je cherche</label>
              <div className='flex justify-center gap-10'>
                <button onClick={handleMatchPreferencesF} className={`${matchFemaleButtonSelected? "border-white" : "border-transparent"} border-[0.15rem] p-1`}>
                  <PiGenderFemaleBold className='text-5xl text-pink-500 text-center my-auto' />
                </button>
                <button onClick={handleMatchPreferencesM} className={`${matchMaleButtonSelected? "border-white" : "border-transparent"} border-[0.15rem] p-1`}>
                  <PiGenderMaleBold className='text-5xl text-blue-500 text-center my-auto' />
                </button>
                <button onClick={handleMatchPreferencesNB} className={`${matchNonBinaryButtonSelected? "border-white" : "border-transparent"} border-[0.15rem] p-1`}>
                  <PiGenderIntersexBold className='text-5xl text-yellow-500 text-center my-auto' />
                </button>
              </div>
            </div>

            <div className='grid'>
              <label className='uppercase text-xl px-5'>Caractéristiques</label>
              <div className='grid gap-2'>
                <input className='px-5 py-2 bg-gradient-to-r rounded-full bg-gray-200 text-black ' placeholder={Caracters[0]} type='text' onChange={(e)=>{setCaracter1(e.target.value)}}></input>
                <input className='px-5 py-2 bg-gradient-to-r rounded-full bg-gray-200 text-black ' placeholder={Caracters[1]} type='text' onChange={(e)=>{setCaracter2(e.target.value)}}></input>
                <input className='px-5 py-2 bg-gradient-to-r rounded-full bg-gray-200 text-black ' placeholder={Caracters[2]} type='text' onChange={(e)=>{setCaracter3(e.target.value)}}></input>
              </div>
            </div>

            <div>
              <input id='subscription_check' type='checkbox' onChange={handleSubscription} checked={newSubscription}/>
              <label className='px-2'>Je veux recevoir des actualités par E-mail pour les futurs événements.</label>
            </div>

          </div>
          
          <div className=''>
            <p className='text-center text-red-300 py-1 '>
              {error}
            </p>
            <p className='text-center text-green-400 py-1 '>
              {successfullSave}
            </p>
          </div>

          <div className='grid justify-center'>
            <button type='submit' className={`bg-white rounded-lg py-2 px-5 text-black uppercase disabled:bg-gray-400`} disabled={!changedProfile}>
              Sauvegarder
            </button>
          </div>
          
        </form>

        <div className=' flex justify-center mx-auto'>
            <button className='bg-white rounded-lg py-2 px-5 text-black font-bold uppercase ' onClick={DisconnectHandler}>
              Déconnection
            </button>
        </div>

      </div>

      <div className='absolute top-5 right-5'>
        <button onClick={handleClose}>
          <HiMiniXMark className=' text-white/80 text-5xl'/>
        </button>
      </div>
    </div>
  )
}

const NotificationsView = ({Notifications,OpenReference,DocumentID}) => {

  async function handleExit(e){
    e.preventDefault()

    OpenReference[1](false)

    let changedSeenValues = false

    if(OpenReference){
      if(Notifications.length > 0){
        Notifications.forEach((notification) =>{
          if( !notification.seen){
            notification.seen = true
            changedSeenValues=true
          }
        })
      }
    }

    if(changedSeenValues){
      await updateUser(DocumentID,{notifications:Notifications})
    }
  }

  // Sorting the list by time_stamp in ascending order
  const notificationsOrderedByTimeStamp = Notifications.sort((a, b) => b.time_stamp - a.time_stamp);


  return(
    <div className={`bg-black/80 text-white h-screen w-screen relative`}>

    <div className='flex flex-col justify-center gap-20 h-screen max-h-screen overflow-auto w-screen max-w-[500px] mx-auto'>

      <h3 className='text-2xl font-bold text-center'>Notifications</h3>

      <div className=' grid gap-5 justify-center px-10 h-[575px] overflow-auto'>
        {
          Notifications.length===0?<p className='text-center my-auto text-2xl text-gray-500'> - Rien ici - </p>:
            notificationsOrderedByTimeStamp.map((value,key) => {
              if(!value.expired){
                return(
                  <div key={key} className='bg-red-400/20'>
                    <h2 className='font-medium text-xl mb-2 border-b-[0.15rem] border-gray-400'>
                      {value.title}
                    </h2>
                    <p className='max-w-[150px] text-balance'>
                      {value.message}
                    </p>
                  </div>
                )
              }
            })
          }
      </div>

    </div>

    <div className='absolute top-5 right-5'>
      <button onClick={handleExit}>
        <HiMiniXMark className=' text-white/80 text-5xl'/>
      </button>
    </div>
  </div>


  )
}

const CountdownTimer = ({ targetDate,timeUpRef }) => {

  const target_split = targetDate.split('-')
  const dayMonthYear = target_split[0].split('/')
  const hourMinSplit = target_split[1].split(":")
  const hour = hourMinSplit[0]
  const minute = hourMinSplit[1]


  const normalizedDate = `${dayMonthYear[2]}-${dayMonthYear[1]}-${dayMonthYear[0]}T${hour}:${minute}:00.000Z`


  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const targetTime = new Date(normalizedDate).getTime();
    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      // Countdown reached, handle accordingly
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [normalizedDate]);

  useEffect(() => {
    if(timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes ===0 && timeRemaining.seconds === 0){
      timeUpRef[1](true)
    }
  })

  return (
    <div className=''>
      <p>{timeRemaining.days}j : {timeRemaining.hours}h : {timeRemaining.minutes}m : {timeRemaining.seconds}s </p>
    </div>
  );
};
