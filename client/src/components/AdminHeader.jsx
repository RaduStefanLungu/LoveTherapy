
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { addNotification, addUser, clearUsersNotifications, getNotifications, sendNotificationsToUsers } from '../firebase'

export default function AdminHeader() {
    
    const [error,setError] = useState('')
    const { currentUser, logout } = useAuth()

    const redirect = useNavigate()

    async function handleLogout(e){
        e.preventDefault()
        
        setError('')

        try {
            await logout()
            redirect('/')
        } catch{
            setError('Failed to log out')
        }
    }
    
    function handleAddUser(e){
        e.preventDefault()

        try{
            addUser("mylittlepony@yahoo.com","0493387003","M",["redhead","pantoufles","deus vult"],false,true)
        }catch(err){
            setError(err)
        }
    }

    function handleTest(e){
        e.preventDefault()

        console.log(getNotifications());
    }

    function handleAddNotification(e){
        e.preventDefault()

        const my_notification = {
            title: "Love Therapy & Pro Web Solutions",
            message: "EN - Welcome everyone to our application ! On 9th of february 2024 we will bring to you the opportunity to find your soulmate and have a wonderful Valentine's Day party at our nightclub Budha Rouge !"
        }

        const my_notification2 = {
            title: "Love Therapy & Pro Web Solutions",
            message: "FR - Bienvenue à tous sur notre application ! Le 9 février 2024, nous vous offrirons l'opportunité de trouver votre âme sœur et de passer une merveilleuse soirée de la Saint-Valentin dans notre nightclub, le Budha Rouge !"
        }

        const my_notification3 = {
            title: "This should be the first in line",
            message: "YEEET"
        }

        // addNotification(my_notification.title, my_notification.message)
        // addNotification(my_notification2.title, my_notification2.message)
        // addNotification(my_notification3.title, my_notification3.message)
    }

    function handleSendNotificationsToUsers(e){
        e.preventDefault()
        sendNotificationsToUsers()

    }

    function handleClearUsersNotifications(e){
        e.preventDefault()

        clearUsersNotifications()
    }

    return (
    <div>

        <div className='grid gap-2 py-5'>
            <button className='text-black bg-yellow-700 p-2 ' onClick={handleLogout}>LogOut</button>
            <button className='text-black bg-yellow-700 p-2 disabled:bg-gray-400' onClick={handleAddUser} disabled>Add User</button>
            <button className='text-black bg-yellow-700 p-2 disabled:bg-gray-400' onClick={handleTest} >Get Notifications</button>
            <button className='text-black bg-yellow-700 p-2 disabled:bg-gray-400' onClick={handleAddNotification} >Add Notification</button>
            <button className='text-black bg-yellow-700 p-2 disabled:bg-gray-400' onClick={handleSendNotificationsToUsers} >Send Notifications to Users</button>
            <button className='text-black bg-yellow-700 p-2 disabled:bg-gray-400' onClick={handleClearUsersNotifications} >Clear Users Notifications</button>
        </div>
        

        <p className='bg-red-500 text-black font-medium text-center'>{error}</p>

    </div>
  )
}
