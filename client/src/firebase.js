import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { addDoc, collection, getFirestore, doc, getDoc, getDocs, updateDoc, deleteDoc, Timestamp } from "firebase/firestore"; 
import { updateMatch } from "./firebase_admin";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);

export const auth = getAuth(app)

const firestore_db = getFirestore(app)


export async function checkIfAdmin(userEmail){
  const myDoc = await getDocumentById('misc','admin_accounts')
    
  try{

    if(myDoc.emails.includes(userEmail)){
      return true
    }
    else return false

  }catch(err){
    console.log(err.message);
  }

}

export async function checkIfBarman(userEmail){
  const myDoc = await getDocumentById('misc','barman_accounts')
    
  try{

    if(myDoc.emails.includes(userEmail)){
      return true
    }
    else return false

  }catch(err){
    console.log(err.message);
  }

}
export async function getUserDocument(userEmail){
  const myCollection = await collection(firestore_db,"user_data")
  const querySnapshot = await getDocs(myCollection)
  
  const documentsData = []
  querySnapshot.forEach((doc) => {
    documentsData.push({id: doc.id, ...doc.data()})
  })  

  let searchedDocument = null
  documentsData.forEach((doc) => {
    if(doc.email === userEmail){
      searchedDocument = doc
      return false
    }
  })
  return searchedDocument;
}

export async function getUserDocumentByID(userID){
  const myCollection = await collection(firestore_db,"user_data")
  const querySnapshot = await getDocs(myCollection)
  
  const documentsData = []
  querySnapshot.forEach((doc) => {
    documentsData.push({id: doc.id, ...doc.data()})
  })  

  let searchedDocument = null
  documentsData.forEach((doc) => {
    if(doc.id === userID){
      searchedDocument = doc
      return false
    }
  })
  return searchedDocument;
}

const getDocumentById = async (collectionName, documentId) => {
  try {
    const docRef = doc(firestore_db, collectionName, documentId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      // Document found, you can access its data using documentSnapshot.data()
      return documentSnapshot.data();
    } else {
      // Document does not exist
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export async function getUsers(){
  const myCollection = await collection(firestore_db,"user_data")
  const querySnapshot = await getDocs(myCollection)

  const all_users = []
  querySnapshot.forEach((doc) => {
    all_users.push({id: doc.id, ...doc.data()})
  })  

  return all_users;
}

export async function addUser(email,phone,sex,caracteristics,newsletterSubscription,acceptedTerms,accountCompleted){
  const data = {
    account_completed: accountCompleted,
    caracteristics: caracteristics,
    email: email,
    newsletter_subscription: newsletterSubscription,
    phone_number: phone,
    sex: sex,
    notifications: [],
    my_match_sex : "/",
    my_match_id : "/",
    accepted_terms_of_service : acceptedTerms,
    account_created_timestamp : Timestamp.now()
  }

  try{
    addDoc(collection(firestore_db,"user_data"),data)
    return(true)
  }catch(e){
    addError({
      e_message: "Failed to add user to user_data firestore table.",
      program_execution: "Failed to execute firebase.addUser(...)",
      program_function_error: `addUser(${email},${phone},${sex},${caracteristics},${newsletterSubscription},${accountCompleted})`,
      program_page: "-",
      user_email: `${email}`
    })
    return(e)
  }

}

export async function updateUser(docID,data){
  const documentRef = doc(firestore_db,"user_data",docID)

  updateDoc(documentRef,data).then(
    () => {
      console.log('successfully updated user');
      return(true)
    }
  ).catch(
    (error) => {
      addError({
        e_message: "Failed to update data to user_data firestore table.",
        error : `${error.message}`,
        program_execution: "Failed to execute firebase.updateUserCaracteristics(docID,data)",
        program_function_error: `updateUserCaracteristics(${docID},${data})`,
        program_page: "/profile -> settingsView",
        user_document_id: `${docID}`
      })
      console.log(error);
      return(error)
    }
  )

  
}

export async function getNotifications(){
  // Allowed : all users
  const myCollection = await collection(firestore_db,"notifications")
  const querySnapshot = await getDocs(myCollection)

  const all_notifications = []
  querySnapshot.forEach((doc) => {
    all_notifications.push({id: doc.id, ...doc.data()})
  })  

  return all_notifications;
}

export async function addNotification(title,message){
  // Allowed : admin/dev

  const data = {
    title: title,
    message: message,
    expired: false,
    sent_to_users : false,
    time_stamp: Timestamp.now()
  }

  try{
    addDoc(collection(firestore_db,"notifications"),data)
    return('Notification successfully added !')
  }catch(e){
    addError({
      e_message: "Failed to add notification to notifications firestore table.",
      program_execution: "Failed to execute firebase.addNotification(...)",
      program_function_error: `addUser(${title},${message})`,
      program_page: "-",
      user_email: `-`
    })
    return(e)
  }
}


export async function removeNotification(notificationID) {
  try {
    // Create a reference to the document to be deleted
    const notificationRef = doc(firestore_db, 'notifications', notificationID);

    // Delete the document
    await deleteDoc(notificationRef);

    console.log('Notification removed successfully');
  } catch (error) {
    addError({
      e_message: "Failed to remove notification from notifications firestore table.",
      error : `${error.message}`,
      program_execution: "Failed to execute firebase.removeNotification(notiifcationID)",
      program_function_error: `removeNotification(${notificationID})`,
      program_page: "/admin/dashboard -> notificationsView",
      user_document_id: `${notificationID}`
    })
    console.log(error);
    return(error)
  }
}

export async function updateNotification(docID,data){
  const documentRef = doc(firestore_db,"notifications",docID)

  updateDoc(documentRef,data).then(
    () => {
      console.log('successfully updated notification');
      return(true)
    }
  ).catch(
    (error) => {
      addError({
        e_message: "Failed to update data to notifications firestore table.",
        error : `${error.message}`,
        program_execution: "Failed to execute firebase.updateNotification(docID,data)",
        program_function_error: `updateNotification(${docID},${data})`,
        program_page: "/admin/dashboard -> notificationsView",
        user_document_id: `${docID}`
      })
      console.log(error);
      return(error)
    }
  )

  
}

export async function sendNotificationsToUsers(notificationsIds){
  //adds notification to user.notifications IF notification.id is not in user.notifications and if notification.expired = false

  const usersCollection = await collection(firestore_db,"user_data")
  const querySnapshotUsers = await getDocs(usersCollection)

  // get all notifications from notifications
  const all_notifications = await getNotifications()
  // const updated_notifications_list = all_notifications.map((item) => ({ ...item, seen: false }));      // adds all notifications !!
  const updated_notifications_list = all_notifications
  .filter((item) => notificationsIds.includes(item.id))
  .map((item) => ({ ...item, seen: false }));

  // update each user notifications list
  querySnapshotUsers.forEach((user) => {
    const users_notifications = user.data().notifications

    const updatedUsersNotifications = [
      ...users_notifications,
      ...updated_notifications_list.filter(
        (updatedNotification) =>
          updatedNotification.expired === false &&
          !users_notifications.some((userNotification) => userNotification.id === updatedNotification.id)
      ),
    ];

    updateUser(user.id,{notifications:updatedUsersNotifications})
  })  
}
export async function clearUsersNotifications(){
  const usersCollection = await collection(firestore_db,"user_data")
  const querySnapshotUsers = await getDocs(usersCollection)

  const notificationsCollection = await collection(firestore_db,"notifications")
  const querySnapshotNotifications = await getDocs(notificationsCollection)


  // update users
  querySnapshotUsers.forEach((user) =>{
    updateUser(user.id,{notifications:[]})
  })

  // update notification

  querySnapshotNotifications.forEach((notification) => {
    updateNotification(notification.id,{sent_to_users:false})
  })

}

export async function getCountdownTime(){
  const countdownDoc = await getDocumentById("misc","CountdownTime");
  return(`${countdownDoc.date}-${countdownDoc.hour}`)
  
}


export async function getUserCaracteristics(userDocumentID){

  const document = await getDocumentById('user_data',userDocumentID)

  if(document !== null){
    return(document.caracteristics)
  }

}

export async function getMatchDocumentByID(matchID){
  const myCollection = await collection(firestore_db,"matching_table")
  const querySnapshot = await getDocs(myCollection)
  
  const documentsData = []
  querySnapshot.forEach((doc) => {
    documentsData.push({id: doc.id, ...doc.data()})
  })  

  let searchedDocument = null
  documentsData.forEach((doc) => {
    if(doc.id === matchID){
      searchedDocument = doc
      return false
    }
  })
  return searchedDocument;
}

export async function getMatchDocumentByPersonID(p_id){
  const myCollection = await collection(firestore_db,"matching_table")
  const querySnapshot = await getDocs(myCollection)
  
  const documentsData = []
  querySnapshot.forEach((doc) => {
    documentsData.push({id: doc.id, ...doc.data()})
  })  

  let searchedDocument = null
  documentsData.forEach((doc) => {
    if(doc.p1_id === p_id || doc.p2_id === p_id){
      searchedDocument = doc
      return false
    }
  })
  return searchedDocument;
}

export async function addError(data){
  const error_data = {
    error_time: Timestamp.now(),
    error_message: data
  }
  addDoc(collection(firestore_db,"error_table"),error_data)
}



// export default app;