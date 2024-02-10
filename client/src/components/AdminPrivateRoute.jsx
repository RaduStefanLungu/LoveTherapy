import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { checkIfAdmin } from '../firebase';

export default function AdminPrivateRoute({ children }) {
    const { currentUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    const redirect = useNavigate()
  
    useEffect(() => {
      const fetchAdminStatus = async () => {
        try {
          const response = await checkIfAdmin(currentUser.email);
          if(response){
            setIsAdmin(response);
          }
          else{
            return redirect('/profile')
          }
          
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false); // Set isAdmin to false in case of an error
        }
      };
  
      fetchAdminStatus();
    }, [currentUser.email]); // Depend on currentUser.email to re-run the effect when user changes
  
    // Return the result only when currentUser and isAdmin are true
    if (currentUser && isAdmin) {    
       return children;
    } 
  }