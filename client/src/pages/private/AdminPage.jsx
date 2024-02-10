import React, { useEffect, useRef, useState } from 'react'
import { addNotification, clearUsersNotifications, getNotifications, getUsers, removeNotification, sendNotificationsToUsers, updateNotification } from '../../firebase'
import { Link } from 'react-router-dom'
import { add50, autoMatch, clearMatches, clearProgapation, make_matching, match, propagateMatch, removeAllBots, removeAllMatches } from '../../firebase_admin'


export default function AdminPage() {

  const [allUsers,setAllUsers] = useState([])
  const [allNotifs,setAllNotifs] = useState([])
  const [usersTypes,setUsersTypes] = useState([])


  function CalculateSex(userList){
    let males = 0
    let females = 0 
    let nonbinary = 0
    let undefined = 0

    userList.forEach(user => {

      switch (user.sex){
        case "M":
          males += 1
          break;
        case "F":
          females += 1
          break;
        case "NB":
          nonbinary += 1
          break;
        default:
          undefined += 1
          break;
      }
    });

    return([males,females,nonbinary,undefined])
  }

  useEffect(() => {
    getUsers().then(
      (response) => {
        setAllUsers(response)
        setUsersTypes(CalculateSex(response))
      }
    )

    getNotifications().then((response) =>{
      setAllNotifs(response)
    })

  },[])

  // all buttons state
  const [usersClicked,setUsersClicked] = useState(false)
  const [notificationsClicked,setNotificationsClicked] = useState(false)
  const [matchClicked,setMatchClicked] = useState(true)
  const [addBotsClicked,setAddBotsClicked] = useState(false)

  // all buttons handlers

  function handleNotifications(e){
    e.preventDefault()

    setNotificationsClicked(true)
    
    setUsersClicked(false)
    setMatchClicked(false)
    setAddBotsClicked(false)
  }

  function handleUsers(e){
    e.preventDefault()

    setUsersClicked(true)
    
    setNotificationsClicked(false)
    setMatchClicked(false)
    setAddBotsClicked(false)
  }

  function handleMatch(e){
    e.preventDefault()

    setNotificationsClicked(false)
    setUsersClicked(false)
    setMatchClicked(true)
    setAddBotsClicked(false)

  }

  function handleAddBots(e){
    e.preventDefault()

    setNotificationsClicked(false)
    setUsersClicked(false)
    setMatchClicked(false)
    setAddBotsClicked(true)
  }


  return (
    <div className=''>

      <h1 className='text-4xl font-bold'>
        Admin Page
      </h1>

      <header id='buttons_holder' className='px-2 grid grid-cols-4 gap-1 text-white font-bold'>
        <Link to={'/profile'} className={`p-2 my-auto text-black border-black border-[0.15rem]`}>My Profile</Link>
        <button onClick={handleUsers} className={`py-5 px-3 ${usersClicked? 'bg-[var(--colorSecondary)]' : 'bg-[var(--colorPrimary)]'} overflow-hidden`}>Users</button>
        <button onClick={handleNotifications} className={`py-5 px-3 ${notificationsClicked? 'bg-[var(--colorSecondary)]' : 'bg-[var(--colorPrimary)]'} overflow-hidden`}>Notifications</button>
        <button onClick={handleMatch} className={`py-5 px-3 text-sm ${matchClicked? 'bg-[var(--colorSecondary)]' : 'bg-[var(--colorPrimary)]'} overflow-hidden`}>Manual Match</button>
        <button onClick={handleAddBots} className={`py-5 px-3 text-sm ${addBotsClicked? 'bg-[var(--colorSecondary)]' : 'bg-[var(--colorPrimary)]'} overflow-hidden`}>Add Bots</button>
      </header>

      <div className={`${notificationsClicked?"block" : "hidden"}`}>
        <Notifications Notifs={allNotifs} />
      </div>

      <div className={`${usersClicked?"block" : "hidden"}`}>
        <UsersProfiles Users={allUsers} UsersBySex={usersTypes}/>
      </div>

      <div className={`${matchClicked?"block" : "hidden"}`}>
        <Match  />
      </div>

      <div className={`${addBotsClicked?"block" : "hidden"}`}>
        <AddBots  />
      </div>

    </div>
  )
}




const Notifications = ({Notifs}) => {

  const [allNotifications,setAllNotifications] = useState(true)
  const [createNotif,setCreateNotif] = useState(false)
  const [sendNotif,setSendNotif] = useState(false)
  const [clearUsersNotif,setClearUsersNotif] = useState(false)

  function handleAllNotifications(e){
    e.preventDefault()

    setAllNotifications(true)

    setCreateNotif(false)
    setSendNotif(false)
    setClearUsersNotif(false)

  }
  
  function handleCreateNotif(e){
    e.preventDefault()

    
    setCreateNotif(true)

    setAllNotifications(false)
    setSendNotif(false)
    setClearUsersNotif(false)

  }
  
  function handleSendNotif(e){
    e.preventDefault()

    setAllNotifications(false)

    setCreateNotif(false)
    setSendNotif(true)
    setClearUsersNotif(false)

  }

  function handleClearUsersNotif(e){
    e.preventDefault()

    setAllNotifications(false)

    setCreateNotif(false)
    setSendNotif(false)
    setClearUsersNotif(true)

  }


  const NotificationsView = ({BackgroundColor}) => {
    const TimestampConverter = ({ timestamp }) => {
      // Assuming timestamp is an object like { seconds: ..., nanoseconds: ... }
      const seconds = timestamp.seconds || 0;
      const nanoseconds = timestamp.nanoseconds || 0;
    
      // Convert Firestore timestamp to JavaScript Date
      const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    
      // Format date to DD/MM/YYYY - HH:MM:SS
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    
      return <div>{formattedDate}</div>;
    };

    return(
      <div className={`grid ${BackgroundColor}`}>
        <h3 className='py-3 text-2xl font-bold'>All Notifications</h3>
        <div className='grid grid-flow-row gap-5 max-h-[500px] overflow-auto'>
          {
            Notifs.map((value,key)=>{
              return(
                <div key={key} className='grid bg-gray-300 mx-2 px-2'>
                  <h3><span className='font-bold'>Notification Title :</span> {value.title}</h3>
                  <h3 className='flex'><span className='font-bold'>Creation Time :</span> <TimestampConverter timestamp={value.time_stamp}/> </h3>
                  <h3><span className='font-bold'>Expired :</span> {value.expired?"Oui":"Non"}</h3>
                  <p><span className='font-bold'>Notification Message :</span> <br/> {value.message}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )

  }

  const CreateView = ({BackgroundColor}) => {

    const [error,setError] = useState("")
    const [successMessage,setSuccessMessage] = useState("")

    const titleRef = useRef()
    const messageRef = useRef()


    async function handleSubmit(e){
      e.preventDefault()
      
      const myData = {
        titre : titleRef.current.value,
        message : messageRef.current.value
      }

      try{
        await addNotification(myData.titre, myData.message).then(
          (response) => {
            setSuccessMessage(response)
          }
        )
      } catch(err){
        setError(err.message)
      }

    }

    return(
      <div className={`${BackgroundColor} `}>

        <p className='bg-white text-red-500 font-medium px-5 text-center'>{error}</p>

        <form onSubmit={handleSubmit} className='grid px-3 gap-5 py-2'>

          <input id='notif_title' ref={titleRef} type='text' placeholder='Titre' className='placeholder:px-2 ' />
          <textarea id='notif_message' ref={messageRef} placeholder='Message' className='placeholder:px-2 '/>


          <p className='text-center bg-white px-5 text-green-500 font-medium'>{successMessage}</p>

          <div className='grid justify-center'>
            <button type='submit' className='px-20 py-2 bg-[var(--colorPrimary)] disabled:bg-gray-500 text-white font-bold' disabled={successMessage.length>0?true:false}>Create</button>
          </div>

        </form>

      </div>
    )
  }

  const SendNotificationView = ({BackgroundColor,}) => {

    const [sendMessage,setSendMessage] = useState("")
    const [err,setError] = useState("")

    const NotificationTab = ({Notification}) => {

      async function handleSendSelectedNotifs(e){
        e.preventDefault()
  
        try{
          await sendNotificationsToUsers(Notification.id).then(
            (r1)=>{
              updateNotification(Notification.id,{sent_to_users:true}).then((r2)=>{setSendMessage('Notification has been successfully sent to users')})
              
            }
          )
        }catch(err){
          setError(err)
        }
  
      }

      async function handleDeleteSelectedNotifs(e){
        e.preventDefault()
  
        try{
          await removeNotification(Notification.id).then(
            (r1)=>{
              setSendMessage('Notification has been successfully removed.')
            }
          )
        }catch(err){
          setError(err)
        }
  
      }

      return(
        <div className='flex gap-2 bg-gray-300 border-black border-[0.05rem] p-2'>
          <div className='grid'>
            <button onClick={handleSendSelectedNotifs} className='bg-white disabled:bg-gray-600 text-black font-medium p-2 border-black border-[0.15rem] my-auto' disabled={Notification.sent_to_users?true:false}>Send</button>
            <button onClick={handleDeleteSelectedNotifs} className='bg-white disabled:bg-gray-600 text-black font-medium p-2 border-black border-[0.15rem] my-auto' disabled={Notification.sent_to_users?true:false}>Delete</button>
          </div>
          <div className='grid '>
            <h3><span className='font-bold'>Notification Title :</span> {Notification.title}</h3>
            <h3><span className='font-bold'>Expired :</span> {Notification.expired?"Oui":"Non"}</h3>
            <p><span className='font-bold'>Notification Message :</span> <br/> {Notification.message}</p>
          </div>
        </div>
      )
    }

    return(
      <div className={`${BackgroundColor} p-2 grid gap-5`}>

        

        <p className={`bg-white ${err.length>0 ? "text-red-500": "text-green-500 "}`}>{sendMessage}</p>

        <div className='grid max-h-screen overflow-auto'>
          {
              Notifs.map((value,key)=>{
                return(
                  <NotificationTab key={key} Notification={value} />
                )
              })
            }
        </div>

      </div>
    )
  }

  const ClearUsersNotifsView = ({BackgroundColor}) => {
    const [message,setMessage] = useState("")

    async function handleClearUsersNotifications(e){
      e.preventDefault()

      await clearUsersNotifications().then(
        () => {
          setMessage("Action successfully executed !")
        }
      )
  }

    return(
      <div className={`${BackgroundColor} p-2`}>
        <div className='grid'>
          <p className='text-center font-medium'>{message}</p>
          <button onClick={handleClearUsersNotifications} className='p-2 bg-white text-black font-black border-[0.15rem]'>Clear Users Notifs</button>
        </div>
      </div>
    )
  }

  return(
    <div className='bg-[var(--colorSecondary)] p-3'>
      <header className='grid grid-cols-4'>
        <button onClick={handleAllNotifications} className={`${allNotifications? "bg-blue-gray-200" : ""} `}>All Notifs</button>
        <button onClick={handleCreateNotif} className={`${createNotif? "bg-red-200" : ""} `}>Create</button>
        <button onClick={handleSendNotif} className={`${sendNotif? "bg-blue-200" : ""} `}>Send Notification</button>
        <button onClick={handleClearUsersNotif} className={`${clearUsersNotif? "bg-yellow-400" : ""} `}>Clear Users Notifications</button>
        
      </header>      

      
      <div className={`${allNotifications?"block":"hidden"}`}>
        <NotificationsView BackgroundColor={"bg-blue-gray-200"}/>
      </div>

      <div className={`${createNotif?"block":"hidden"}`}>
        <CreateView BackgroundColor={"bg-red-200"}/>
      </div>

      <div className={`${sendNotif?"block":"hidden"}`}>
        <SendNotificationView BackgroundColor={"bg-blue-200"}/>
      </div>

      <div className={`${clearUsersNotif?"block":"hidden"}`}>
        <ClearUsersNotifsView BackgroundColor={"bg-yellow-400"} />
      </div>

    </div>
  )
}

const UsersProfiles = ({Users,UsersBySex}) => {

  const UserWindow = (User) => {

    const [headerClicked,setHeaderClicked] = useState(false)

    const [showUsersNotifications,setShowUsersNotifications] = useState(false)

    function handleShowUsersNotifications(e){
      e.preventDefault()

      setShowUsersNotifications(!showUsersNotifications)
    }
    
    function handleHeaderClicked(e){
      e.preventDefault()
  
      setHeaderClicked(!headerClicked)
    }

    const TimestampConverter = ({ timestamp }) => {
      // Assuming timestamp is an object like { seconds: ..., nanoseconds: ... }
      const seconds = timestamp.seconds || 0;
      const nanoseconds = timestamp.nanoseconds || 0;
    
      // Convert Firestore timestamp to JavaScript Date
      const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    
      // Format date to DD/MM/YYYY - HH:MM:SS
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    
      return <div>{formattedDate}</div>;
    };

    return(
      <div className='border-[0.05rem] border-black p-1 grid grid-flow-row'>
        <div className='flex justify-between'>
          <div className='' onClick={handleHeaderClicked}>
            <h4><span className='font-bold'>User ID :</span> {User.User.id}</h4>
            <h4><span className='font-bold'>EMAIL :</span> {User.User.email}</h4>
            <h4 className='grid'><span className='font-bold'>CREATION TIME : </span> <TimestampConverter timestamp={User.User.account_created_timestamp}/> </h4>
            <h4><span className='font-bold'>Compte complet? :</span> {User.User.account_completed?"Oui":"Non"}</h4>
          </div>
          <div className='grid m-auto'>
            <button onClick={handleShowUsersNotifications} className='bg-gray-400 p-1 rounded-lg hover:bg-gray-500'>Show Notifs</button>
          </div>
        </div>
        <div className={`${headerClicked?"block":"hidden"} `}>
          <h4><span className='font-bold'>SEX :</span> {User.User.sex}</h4>
          <h4><span className='font-bold'>GSM :</span> {User.User.phone_number}</h4>
          <h4><span className='font-bold'>MATCH ID :</span> {User.User.my_match_id}</h4>
          <h4><span className='font-bold'>MATCH SEX :</span> {User.User.my_match_sex}</h4>
          <h4><span className='font-bold'>NEWSLETTER :</span> {User.User.newsletter_subscription?"Oui":"Non"}</h4>
          <h4><span className='font-bold'>CARACTERISTIQUES :</span><div className='px-10'>{User.User.caracteristics.map((val,k)=>{
            return(
              <p key={k}>{val}</p>
            )
          })}</div></h4>
          <h4 className={`${showUsersNotifications?"block":"hidden"}`}><span className='font-bold'>NOTIFICATIONS :</span><div className='px-10'>{User.User.notifications.map((val,k)=>{
            return(
              <div key={k} className='grid gap-1 border-gray-500 border-[0.05rem]'>
                <h2 className='font-bold'>{val.title}</h2>
                <p>{val.message}</p>
              </div>
            )
          })}</div></h4>
        </div>
      </div>
    )
  }


  return(
    <div className='bg-[var(--colorSecondary)] p-3 grid min-h-screen max-h-screen overflow-auto content-start'>
      <div className='bg-white p-2'>
        <h3 className='py-3 text-2xl font-bold'>Users List</h3>
        <div className=''>
          <h3>Registered Users : <span className='text-black font-bold'>{Users.length}</span></h3>
          <div className='grid grid-flow-col gap-10 py-5'>
            <div className='grid justify-center'>
              <h3>Males : <span className='text-blue-500 font-bold'>{UsersBySex[0]}</span></h3>
              <h3>Females : <span className='text-pink-300 font-bold'>{UsersBySex[1]}</span></h3>
              <h3>NonBinary : <span className='text-yellow-700 font-bold'>{UsersBySex[2]}</span></h3>
              <h3>Undefined : <span className='text-gray-700-300 font-bold'>{UsersBySex[3]}</span></h3>
            </div>

          </div>
        </div>
        <div className=' p-1 grid grid-flow-row max-h-[500px] overflow-auto'>
          <h3>Users</h3>
          {
            Users.map((value,key)=>{
              return(
                <UserWindow key={key} User={value}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

const Match = () => {
  
  const [person1Id,setPerson1Id] = useState("")
  const [person2Id,setPerson2Id] = useState("")

  const [message,setMessage] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    await match(person1Id,person2Id)
    setMessage("Successfull match !")
  }

  async function handleAutoMatch(e){
    e.preventDefault()

    await autoMatch()
    setMessage('Successfuly created matching profiles !')
    // const noms_1 = [
    //   'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Isabel', 'Jack'];

    // const noms_2 = [
    //   'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rose', 'Samuel', 'Taylor', 'Victoria'];

    //   const obj_list_1 =[
    //     {"id": "random_id_6", "name": "Frank", "sex": "M"},
    //     {"id": "random_id_7", "name": "Grace", "sex": "M"},
    //     {"id": "random_id_8", "name": "Henry", "sex": "M"},
    //     {"id": "random_id_9", "name": "Isabel", "sex": "M"},
    //     {"id": "random_id_10", "name": "Jack", "sex": "M"},
    //     {"id": "random_id_3", "name": "Charlie", "sex": "M"},
    //     {"id": "random_id_4", "name": "David", "sex": "M"},
    //     {"id": "random_id_5", "name": "Emma", "sex": "M"},
    //   ]
    //   const obj_list_2 = [
    //     {"id": "random_id_2", "name": "Bob", "sex": "F"},
    //     {"id": "random_id_1", "name": "Alice", "sex": "F"},
    //     {"id": "random_id_4", "name": "David", "sex": "F"},
    //     {"id": "random_id_5", "name": "Emma", "sex": "F"},
    //   ]


    //   make_matching(obj_list_2,[{"id": "random_id_6", "name": "Frank", "sex": "M"}])
  }

  async function handlePropagation(e){
    e.preventDefault()
    await propagateMatch()

    setMessage('Propagation Completed !')
  }

  async function handleClearMatches(e){
    e.preventDefault()

    await removeAllMatches()
    setMessage('Cleared Matches !')
  }

  async function handleClearPropagation(e){
    e.preventDefault()

    await clearProgapation()
    setMessage('Cleared Propagation !')
  }


  return(
    <div className='bg-[var(--colorSecondary)] p-2'>
        <p className='font-bold bg-white py-2 text-center text-xl '>{message}</p>
        <form onSubmit={handleSubmit} className='grid justify-center'>
          <h4 className='font-bold text-xl'>Manual Match : </h4>
          <div className='grid gap-2'>
            <div className='flex'>
              <label>P1 : </label>
              <input type='text' onChange={(e)=>{setPerson1Id(e.target.value)}}/>
            </div>
            <div className='flex'>
              <label>P2 : </label>
              <input type='text' onChange={(e)=>{setPerson2Id(e.target.value)}}/>
            </div>
          </div>
          <button className='p-2 font-bold bg-white border-[0.15rem] border-black mx-auto my-5'>Submit</button>
        </form>
        <div className='grid'>
          <button onClick={handleAutoMatch} className='p-2 font-bold bg-white border-[0.15rem] border-black mx-auto my-5'>Auto-Match</button>
          <button onClick={handlePropagation} className='p-2 font-bold bg-white border-[0.15rem] border-black mx-auto my-5'>Propagate Matches</button>
          <div className='mx-auto my-auto flex gap-5'>
            <button onClick={handleClearMatches} className='p-2 font-bold bg-white border-[0.15rem] border-black mx-auto my-5'>Clear Matches</button>
            <button onClick={handleClearPropagation} className='p-2 font-bold bg-white border-[0.15rem] border-black mx-auto my-5'>Clear Propagation</button>
          </div>
        </div>
    </div>
  )
}

const AddBots = () => {

  const [message,setMessage] = useState("")

  function handleAddMale(e){
    e.preventDefault()

    add50("M")
  }

  function handleAddFemale(e){
    e.preventDefault()

    add50("F")
  }

  function handleAddNonBinary(e){
    e.preventDefault()

    add50("NB")
  }

  async function handleRemoveMale(e){
    e.preventDefault()

    await removeAllBots("M")
    setMessage('successfully removed all M bots')
  }

  async function handleRemoveFemale(e){
    e.preventDefault()

    await removeAllBots("F")
    setMessage('successfully removed all M bots')
  }

  async function handleRemoveNonBinary(e){
    e.preventDefault()

    await removeAllBots("NB")
    setMessage('successfully removed all M bots')
  }

  return(
    <div className='bg-[var(--colorSecondary)] p-2'>
      <div className='bg-purple-500'>
        <p className='py-5 text-xl text-center bg-white text-black font-bold'>{message}</p>
        <div className='grid gap-5 bg-gray-300 p-5'>
          <button onClick={handleAddMale} disabled className='disabled:bg-gray-600 py-2 bg-blue-500 text-center'>Add 50 Male Bots</button>
          <button onClick={handleAddFemale} disabled className='disabled:bg-gray-600 py-2 bg-pink-500 text-center'>Add 50 Female Bots</button>
          <button onClick={handleAddNonBinary} disabled className='disabled:bg-gray-600 py-2 bg-yellow-500 text-center'>Add 50 NonBinary Bots</button>
        </div>
        <div className='grid gap-5 bg-gray-500 p-5'>
          <button onClick={handleRemoveMale} disabled className='disabled:bg-gray-600 py-2 bg-blue-500 text-center'>Remove all Male Bots</button>
          <button onClick={handleRemoveFemale} disabled className='disabled:bg-gray-600 py-2 bg-pink-500 text-center'>Remove all Female Bots</button>
          <button onClick={handleRemoveNonBinary} disabled className='disabled:bg-gray-600 py-2 bg-yellow-500 text-center'>Remove all NonBinary Bots</button>
        </div>
      </div>
    </div>
  )
}