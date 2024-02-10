import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addError, checkIfBarman, getMatchDocumentByPersonID, getUserDocument } from '../../firebase'

import { IoHeartHalf,IoHeartDislike } from "react-icons/io5";
import { BiDrink } from "react-icons/bi";
import { MdNoDrinks } from "react-icons/md";


import { updateMatch } from '../../firebase_admin';


export default function MatchingPage() {
    const { currentUser } = useAuth()

    const [userDocumentId,setUserDocumentId] = useState('')
    const [userMatchId,setUserMatchId] = useState('')                     // user to be matched with
  

    const [givenScannedMatchID,setGivenScannedMatchID] = useState("")     // scanned user (might not be same with userMatchId)

    const [userIsBarman,setUserIsBarman] = useState(false)
    
    const redirect = useNavigate()

    // fill givenScannedMatchID
    const scannedMatchId = useParams()
    useEffect(() => {
        setGivenScannedMatchID(scannedMatchId)

        // do something if givenScannedMatchID.scannedMatchId === undefined

    },[])

      // fill user data
    useEffect(() => {
    
        getUserDocument(currentUser.email)
        .then(
        (fetchedData) => {
            setUserDocumentId(fetchedData.id)
            setUserMatchId(fetchedData.my_match_id)

        }
    ).catch((e) => {
      console.log(e);
      addError(
        {
          e_message: e.message,
          program_execution: "Failed to execute firebase.getUserDocument(currentUser.email) => returned null",
          program_page: "/profile/xyz ->  MatchingPage",
          program_function_error: `getUserDocument(${currentUser.email})`,
          user_email : currentUser.email
        }
      )
      redirect('/')
    })

    },[])

    // check if user is barman
    useEffect(()=>{
        checkIfBarman(currentUser.email).then(
            (response) => {
                setUserIsBarman(response)
            }
        )
    },[])

  return(
    <div>
      <div className='bg_home_image flex flex-col justify-between max-w-screen h-fit min-h-screen'>

        <div>
            {
                userIsBarman?<Barman ScannedMatchID={givenScannedMatchID} /> : userMatchId===givenScannedMatchID.scannedMatchId? <YouMatched UserDocumentID={userDocumentId} MyMatchID={userMatchId} ScannedMatchID={givenScannedMatchID}/> : <NoMatch/>
            }
        </div>

      </div>
    </div>
  )
}

const YouMatched = ({UserDocumentID,MyMatchID,ScannedMatchID}) => {
    async function updateMyMatch(){
        const my_match_doc = await getMatchDocumentByPersonID(UserDocumentID)

        const data = {
            has_matched : true
        }

        const my_match_doc_id = my_match_doc.id

        await updateMatch(my_match_doc_id,data).then(() => {console.log(`Successfully updated match from ${my_match_doc.has_matched} to ${data.has_matched}`);}).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    useEffect(() => {

        if(MyMatchID===ScannedMatchID.scannedMatchId){
            updateMyMatch()
        }
    },[UserDocumentID,MyMatchID,ScannedMatchID])
    
    return(
        <div className='w-screen h-screen bg-black/50 grid'>
            <div className='grid gap-5 justify-center my-auto'>
                <h2 className='text-white font-bold text-2xl text-center'>
                    Vous avez matché !
                </h2>

                <div className='grid justify-center rounded-full mx-auto p-10 bg-white'>
                    <IoHeartHalf className='text-9xl text-red-500'/>
                </div>

                <div>
                    <h2 className='text-white font-bold text-2xl text-center'>
                        Passez au bar pour les shots !
                    </h2>
                </div>

                <div className='grid justify-center'>
                    <Link to={'/profile'} className='button_1 text-2xl md:text-4xl'>
                        Mon profil
                    </Link>
                </div>
            </div>
        </div>
    )
}

const NoMatch = () => {
    return(
        <div className='w-screen h-screen bg-black/50 grid'>
            <div className='grid gap-5 justify-center my-auto'>
                <h2 className='text-white font-bold text-2xl text-center'>
                    Ce n'est pas la bonne personne,<br/>
                    Essayez encore !
                </h2>

                <div className='grid justify-center rounded-full mx-auto p-10 bg-white'>
                    <IoHeartDislike className='text-9xl text-black'/>
                </div>

                <div className='grid justify-center'>
                    <Link to={'/profile'} className='button_1 text-2xl md:text-4xl'>
                        Mon Profil
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Barman = ({ScannedMatchID,}) => {

    const [cuppleHasMatch,setCuppleHasMatch] = useState(null)
    const [alreadyGivenDrinks,setAlreadyGivenDrinks] = useState(null)
    const [matchedDocID,setMatchedDocID] = useState("")

    useEffect(()=>{
        getMatchDocumentByPersonID(ScannedMatchID.scannedMatchId).then(
            (match_from_db) => {
                setCuppleHasMatch(match_from_db.has_matched)
                setAlreadyGivenDrinks(match_from_db.shot_given)
                setMatchedDocID(match_from_db.id)
            }
        )
    },[])


    const OkDrinks = ({HasMatch,AlreadyGivenDrinks,MatchedDocID}) => {

        useEffect(()=> {
            if(HasMatch && !AlreadyGivenDrinks){
                updateMatch(MatchedDocID,{shot_given: true})
            }
        },[])

        return(
            <div className='w-screen h-screen bg-black/50 grid'>
                <div className='grid gap-5 justify-center my-auto'>
                    <h2 className='text-white font-bold text-2xl text-center'>
                        Ils ont matché et peuvent avoir à boir ! <br/>
                    </h2>

                    <div className='grid justify-center rounded-full mx-auto p-10 bg-white'>
                        <BiDrink className='text-9xl text-green-500'/>
                    </div>

                    <h2 className='text-white font-bold text-2xl text-center'>
                        Santé ! <br/>
                    </h2>

                    <div className='grid justify-center'>
                        <Link to={'/profile'} className='button_1 text-2xl md:text-4xl'>
                            Mon Profil
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const NoDrinks = () => {
        return(
            <div className='w-screen h-screen bg-black/50 grid'>
                <div className='grid gap-5 justify-center my-auto'>
                    <h2 className='text-white font-bold text-2xl text-center'>
                        Ils ont matché et ils ont DEJA EU à boir! <br/>
                    </h2>

                    <div className='grid justify-center rounded-full mx-auto p-10 bg-white'>
                        <MdNoDrinks className='text-9xl text-black'/>
                    </div>

                    <h2 className='text-white font-bold text-2xl text-center'>
                        A la prochaine ! <br/>
                    </h2>

                    <div className='grid justify-center'>
                        <Link to={'/profile'} className='button_1 text-2xl md:text-4xl'>
                            Mon Profil
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const NotMatched = () => {
        return(
            <div className='w-screen h-screen bg-black/50 grid'>
                <div className='grid gap-5 justify-center my-auto'>
                    <h2 className='text-white font-bold text-2xl text-center'>
                        Ils N'ONT PAS encore matché ! <br/>
                    </h2>

                    <div className='grid justify-center rounded-full mx-auto p-10 bg-white'>
                        <IoHeartDislike className='text-9xl text-red-500'/>
                    </div>

                    <h2 className='text-white font-bold text-2xl text-center'>
                        Demandez leur de matcher avec la bonne personne <br/>
                    </h2>

                    <div className='grid justify-center'>
                        <Link to={'/profile'} className='button_1 text-2xl md:text-4xl'>
                            Mon Profil
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            {
                cuppleHasMatch && !alreadyGivenDrinks ? <OkDrinks HasMatch={cuppleHasMatch} AlreadyGivenDrinks={alreadyGivenDrinks} MatchedDocID={matchedDocID}/> : <></>
            }
            {
                cuppleHasMatch && alreadyGivenDrinks ? <NoDrinks/> : <></>
            }
            {
                !cuppleHasMatch ? <NotMatched/> : <></>
            }
        </div>
    )
}