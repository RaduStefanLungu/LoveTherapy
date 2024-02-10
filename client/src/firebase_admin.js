import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore, doc, getDocs, updateDoc, deleteDoc, Timestamp } from "firebase/firestore"; 
import { getMatchDocumentByPersonID, getUserDocumentByID, getUsers, updateUser } from './firebase';



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

const firestore_db = getFirestore(app)


async function addError(data){
    const error_data = {
      error_time: Timestamp.now(),
      error_message: data
    }
    addDoc(collection(firestore_db,"error_table"),error_data)
  }

async function getBotDocuments(sex){
    const myCollection = await collection(firestore_db,"bot_data")
    const querySnapshot = await getDocs(myCollection)
    
    const documentsData = []
    querySnapshot.forEach((doc) => {
      documentsData.push({id: doc.id, ...doc.data()})
    })  
  
    let searchedDocuments = []
    documentsData.forEach((doc) => {
      if(doc.sex === sex){
        searchedDocuments.push(doc)
      }
    })
    return searchedDocuments;
  }

export async function getBots(){
    const myCollection = await collection(firestore_db,"bot_data")
    const querySnapshot = await getDocs(myCollection)
  
    const all_users = []
    querySnapshot.forEach((doc) => {
      all_users.push({id: doc.id, ...doc.data()})
    })  
  
    return all_users;
  }
  
export async function getBotDocumentByID(botID){
  const myCollection = await collection(firestore_db,"bot_data")
  const querySnapshot = await getDocs(myCollection)
  
  const documentsData = []
  querySnapshot.forEach((doc) => {
    documentsData.push({id: doc.id, ...doc.data()})
  })  

  let searchedDocument = null
  documentsData.forEach((doc) => {
    if(doc.id === botID){
      searchedDocument = doc
      return false
    }
  })
  return searchedDocument;
}

export async function getBotCaracteristics(botDocumentID){

  const document = await getBotDocumentByID(botDocumentID)

  if(document !== null){
    return(document.caracteristics)
  }

}
  export async function add50(sex){
      
    let bots_list = []
    // create profile and add it to bd
    for(let i = 0; i < 50; i++) {
        bots_list.push(createBotProfile(sex))
    }

    
    //add data to db
    bots_list.forEach(
        (bot) => {
            addBot(bot.bot_name,bot.caracteristics,bot.sex)
        }
    )

    return(true)
    
  }

  function createBotProfile(sex){

    const femaleNames = [
        'Sophie',
        'Camille',
        'Manon',
        'Chloé',
        'Léa',
        'Emma',
        'Julie',
        'Alice',
        'Charlotte',
        'Louise',
        'Inès',
        'Sarah',
        'Zoé',
        'Lucie',
        'Clara',
        'Anna',
        'Émilie',
        'Lola',
        'Jade',
        'Éva',
        'Olivia',
        'Amelia',
        'Isla',
        'Ava',
        'Emily',
        'Mia',
        'Sophia',
        'Isabella',
        'Grace',
        'Ella',
        'Lily',
        'Freya',
        'Poppy',
        'Evie',
        'Charlotte',
        'Daisy',
        'Florence',
        'Alice',
        'Ruby',
        'Rosie'
      ];
      
      const maleNames = [
        'Louis',
        'Lucas',
        'Gabriel',
        'Arthur',
        'Raphaël',
        'Jules',
        'Hugo',
        'Adam',
        'Tom',
        'Léo',
        'Théo',
        'Noah',
        'Nathan',
        'Mathis',
        'Liam',
        'Enzo',
        'Paul',
        'Maxime',
        'Alexandre',
        'Victor',
        'Oliver',
        'Jack',
        'Harry',
        'George',
        'Leo',
        'Noah',
        'Jacob',
        'Charlie',
        'Freddie',
        'Alfie',
        'Oscar',
        'Thomas',
        'William',
        'Henry',
        'Archie',
        'Joshua',
        'James',
        'Ethan',
        'Max',
        'Joseph'
      ];

      const caracteristiquesFemmesBoiteDeNuit = [
        "Cheveux blonds longs",
        "Yeux maquillés de noir",
        "Robe moulante",
        "Talons hauts",
        "Lèvres rouges",
        "Boucles d'oreilles pendantes",
        "Jeans skinny",
        "Cheveux bruns bouclés",
        "Top à sequins",
        "Tatouages visibles",
        "Mini-jupe en cuir",
        "Haut dos nu",
        "Cheveux blonds platine",
        "Robe courte en satin",
        "Chaussures à plateforme",
        "Bouche pulpeuse",
        "Tatouages sur les bras",
        "Haut à épaules dénudées",
        "Cheveux châtains lisses",
        "Combinaison moulante",
        "Bottes à talons hauts",
        "Fard à paupières brillant",
        "Chemisier transparent",
        "Cheveux noirs longs",
        "Bijoux en argent",
        "Short en jean",
        "Talons aiguilles",
        "Yeux verts perçants",
        "Robe à paillettes",
        "Décolleté plongeant",
        "Cheveux roux flamboyants",
        "Pantalon en cuir noir",
        "Collier imposant",
        "Blazer ajusté",
        "Chaussures à lacets",
        "Lingerie en dentelle",
        "Fard à paupières doré",
        "Tatouages sur le dos",
        "Robe à franges",
        "Cheveux courts blonds",
        "Haut court en mesh",
        "Jupe à volants",
        "Boucles d'oreilles à pompons",
        "Chapeau de feutre",
        "Vernis à ongles coloré",
        "Tailleur-pantalon ajusté",
        "Talons compensés",
        "Fard à paupières argenté",
        "Lunettes de soleil audacieuses",
        "Chemisier en soie",
        "Cheveux bleus électriques"
      ];

      const caracteristiquesHommesBoiteDeNuit = [
        "Cheveux bruns courts",
        "Barbe de trois jours",
        "Chemise ajustée",
        "Jeans slim",
        "Baskets blanches",
        "Cheveux noirs lisses",
        "Blouson en cuir",
        "T-shirt moulant",
        "Montre-bracelet en acier",
        "Tatouages sur les bras",
        "Cheveux blonds ébouriffés",
        "Chemise à carreaux",
        "Pantalon en toile",
        "Baskets montantes",
        "Lunettes de soleil aviateur",
        "Barbe bien entretenue",
        "T-shirt imprimé",
        "Pantalon chino",
        "Chaussures en daim",
        "Cheveux roux en brosse",
        "Veste en jean",
        "Polo ajusté",
        "Pantalon cargo",
        "Chaussures en cuir",
        "Cheveux bruns mi-longs",
        "Chemise blanche",
        "Costume cintré",
        "Derbies élégantes",
        "Cheveux blonds en queue-de-cheval",
        "Chemise à manches longues",
        "Pantalon habillé",
        "Richelieus classiques",
        "Cheveux courts gris",
        "Chemise à motifs",
        "Pantalon de costume",
        "Chaussures Oxford",
        "Cheveux châtains bouclés",
        "Polo à col roulé",
        "Pantalon de jogging",
        "Baskets de course",
        "Barbe pleine",
        "T-shirt décontracté",
        "Short en jean",
        "Tongs",
        "Cheveux longs et ondulés",
        "Chemise à fleurs",
        "Short de bain",
        "Sandales",
        "Barbe hirsute",
        "Débardeur musclé",
        "Short de sport",
        "Baskets de basket-ball"
      ];
      

      let chosen_name = ""
      let chosen_caracteristics = []

      // get 3 random numbers for caracteristics (distinc)
      let random_index_caracters = []
      while(random_index_caracters.length < 3 ){
        const randomNumber = Math.floor(Math.random() * 50);
        if(!random_index_caracters.includes(randomNumber)){
            random_index_caracters.push(randomNumber);
        }
      }
    
      const name_randomNumber = Math.floor(Math.random() * femaleNames.length);


      // M
      if(sex === "M"){
        chosen_name = maleNames[name_randomNumber]
        
        random_index_caracters.forEach(
            element => {
                chosen_caracteristics.push(caracteristiquesHommesBoiteDeNuit[element])
            }
          )
      }
      // F
      else if (sex === "F")
      {
        chosen_name = femaleNames[name_randomNumber]

        random_index_caracters.forEach(
            element => {
                chosen_caracteristics.push(caracteristiquesFemmesBoiteDeNuit[element])
            }
          )
      }
      // NB
      else{
        if(name_randomNumber <= 25){
            chosen_name = maleNames[name_randomNumber]

            random_index_caracters.forEach(
                element => {
                    chosen_caracteristics.push(caracteristiquesHommesBoiteDeNuit[element])
                }
              )
        }
        else{
            chosen_name = femaleNames[name_randomNumber]
            
            random_index_caracters.forEach(
                element => {
                    chosen_caracteristics.push(caracteristiquesFemmesBoiteDeNuit[element])
                }
              )
        }
      }





      let profile_data = {
        bot_name : `bot_${chosen_name}` ,
        caracteristics : chosen_caracteristics,
        sex : sex
      }

      return(profile_data)

  }

  export async function addBot(name,caracteristics,sex){
    const data = {
      caracteristics: caracteristics,
      bot_name : name,
      sex: sex,
      my_match_id : "/",
      account_created_timestamp : Timestamp.now()
    }
  
    try{
      addDoc(collection(firestore_db,"bot_data"),data)
      return(true)
    }catch(e){
      addError({
        e_message: "Failed to add bot to bot_data firestore table.",
        program_execution: "Failed to execute firebase_admin.addBot(...)",
        program_function_error: `addBot(${name},${caracteristics},${sex})`,
        program_page: "/admin/dashboard",
      })
      return(e)
    }
  
  }
  
  export async function updateBot(docID,data){
    const documentRef = doc(firestore_db,"bot_data",docID)
  
    updateDoc(documentRef,data).then(
      () => {
        console.log('successfully updated user');
        return(true)
      }
    ).catch(
      (error) => {
        addError({
          e_message: "Failed to update data to bot_data firestore table.",
          error : `${error.message}`,
          program_execution: "Failed to execute firebase.updateBot(docID,data)",
          program_function_error: `updateBot(${docID},${data})`,
          program_page: "/admin/dashboard",
          bot_document_id: `${docID}`
        })
        console.log(error);
        return(error)
      }
    )
  
    
  }

  async function removeBot(botID) {
    try {
      // Create a reference to the document to be deleted
      const botRef = doc(firestore_db, 'bot_data', botID);
  
      // Delete the document
      await deleteDoc(botRef);
  
      console.log('Bot removed successfully');
    } catch (error) {
      addError({
        e_message: "Failed to remove bot from bot_data firestore table.",
        error : `${error.message}`,
        program_execution: "Failed to execute firebase.removeBot(notiifcationID)",
        program_function_error: `removeBot(${botID})`,
        program_page: "/admin/dashboard -> notificationsView",
        bot_document_id: `${botID}`
      })
      console.log(error);
      return(error)
    }
  }

  export async function removeAllBots(sex){
    const allBots = await getBotDocuments(sex);
    
    try{
        allBots.forEach(bot => {
            removeBot(bot.id)
        })
    }catch(err){
        console.log(err);
    }
    
  }

  // matching stuff

  export async function match(p1_id,p2_id){
    const p1_data = {
        my_match_id : p2_id
    }

    const p2_data = {
        my_match_id : p1_id
    }

    await updateUser(p1_id,p1_data)
    await updateUser(p2_id,p2_data)

    await addMatch(p1_id,p2_id)

    return(true)
  }


  export async function autoMatch(){
    const all_users = await getUsers()

    let completed_profiles_users = []

    // get all completed profiles 
    all_users.forEach(user => {
        if(user.account_completed && ["/",""," "].includes(user.my_match_id)){
            completed_profiles_users.push(user)
        }
    })

    // sorting users by match pref and putting them in sous-groups

    let qui_veut_F =  [[],[],[]]     // [ [M], [F], [NB] ]
    let qui_veut_M =  [[],[],[]]     // [ [M], [F], [NB] ]
    let qui_veut_NB = [[],[],[]]     // [ [M], [F], [NB] ]

    completed_profiles_users.forEach(
        user => {
            switch(user.my_match_sex){
                case "F":
                    switch(user.sex){
                        case "F":
                            qui_veut_F[1].push(user)
                            break;
                        case "M":
                            qui_veut_F[0].push(user)
                            break;
                        case "NB":
                            qui_veut_F[2].push(user)
                            break;
                        default:
                            break;
                    }
                    break;
                case "M":
                    switch(user.sex){
                        case "F":
                            qui_veut_M[1].push(user)
                            break;
                        case "M":
                            qui_veut_M[0].push(user)
                            break;
                        case "NB":
                            qui_veut_M[2].push(user)
                            break;
                        default:
                            break;
                    }
                    break;
                case "NB":
                    switch(user.sex){
                        case "F":
                            qui_veut_NB[1].push(user)
                            break;
                        case "M":
                            qui_veut_NB[0].push(user)
                            break;
                        case "NB":
                            qui_veut_NB[2].push(user)
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        }
    )
    
    // console.log(qui_veut_F);
    // console.log(qui_veut_M);
    // console.log(qui_veut_NB);
    
    make_matching(qui_veut_F[0],qui_veut_M[1])
    make_matching(qui_veut_F[2],qui_veut_NB[1])
    make_matching(qui_veut_M[2],qui_veut_NB[0])


    const females_want_females_lists = splitListIn2(qui_veut_F[1])
    const males_want_males_lists = splitListIn2(qui_veut_M[0])
    const nb_want_nb_lists = splitListIn2(qui_veut_NB[2])

    make_matching(females_want_females_lists[0],females_want_females_lists[1])
    make_matching(males_want_males_lists[0],males_want_males_lists[1])
    make_matching(nb_want_nb_lists[0],nb_want_nb_lists[1])

  }

  async function getMatches(){
    const myCollection = await collection(firestore_db,"matching_table")
    const querySnapshot = await getDocs(myCollection)
  
    const all_matches = []
    querySnapshot.forEach((doc) => {
      all_matches.push({id: doc.id, ...doc.data()})
    })  
  
    return all_matches;
  }

  function getUserById_local(userID,userList){

    for(let i = 0; i < userList.length; i++){
      if(userList[i].id === userID){
        return userList[i];
      }
    }
    return null;
  }

  export async function propagateMatch(){
    // based on matching_table , fill each persons profile with its match

    const all_matches = await getMatches()

    const all_users = await getUsers()
    const all_bots = await getBots()
    

    all_matches.forEach((match) => {
      let user_p1 = getUserById_local(match.p1_id,all_users)
      if (user_p1 === null){
        user_p1 = getUserById_local(match.p1_id,all_bots)
      }

      let user_p2 = getUserById_local(match.p2_id,all_users)
      if( user_p2 === null){
        user_p2 = getUserById_local(match.p2_id,all_bots)
      }

      updateUser(user_p1.id,{my_match_id: user_p2.id})
      updateUser(user_p2.id,{my_match_id: user_p1.id})

    })

      
  }

  async function removeMatch(matchID) {
    try {
      // Create a reference to the document to be deleted
      const botRef = doc(firestore_db, 'matching_table', matchID);
  
      // Delete the document
      await deleteDoc(botRef);
  
      console.log('Bot removed successfully');
    } catch (error) {
      addError({
        e_message: "Failed to remove bot from bot_data firestore table.",
        error : `${error.message}`,
        program_execution: "Failed to execute firebase.removeBot(notiifcationID)",
        program_function_error: `removeBot(${matchID})`,
        program_page: "/admin/dashboard -> notificationsView",
        bot_document_id: `${matchID}`
      })
      console.log(error);
      return(error)
    }
  }

  export async function removeAllMatches(){
    const all_matches = await getMatches()
    
    try{
        all_matches.forEach(match => {
            removeMatch(match.id)
        })
    }catch(err){
        console.log(err);
    }
    
  }

  export async function clearProgapation(){
    const all_users = await getUsers()

    all_users.forEach((user) => {
      updateUser(user.id,{my_match_id: "/"})
    })
    return true
  }
  function splitListIn2(list){
    const halfwayIndex = Math.ceil(list.length / 2);
    const firstHalf = list.slice(0, halfwayIndex);
    const secondHalf = list.slice(halfwayIndex);

    return([firstHalf, secondHalf])
  }

  function random_array_of_int(given_length){
    // Générer un tableau avec tous les nombres de 0 à 49 inclus
    const nombres = Array.from({ length: given_length }, (_, index) => index);

    // Mélanger les nombres dans un ordre aléatoire
    for (let i = nombres.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nombres[i], nombres[j]] = [nombres[j], nombres[i]];
    }

    return nombres;
  }

  export async function make_matching(u_list_1,u_list_2){
    // u_list_1 => [{id:..., ...},{},{}]      u_list_2 => [{id:..., ...},{},{}]
    //TODO

    // case 1 : l1 == l2
    
    if(u_list_1.length === u_list_2.length){
      // take random number, use it for each l1 and l2

      const random_numbers_array = random_array_of_int(u_list_1.length)

      random_numbers_array.forEach(
        (index) => {
          addMatch(u_list_1[index].id,u_list_2[index].id)
        }
      )
    }

    // not same length
    else{
      const all_bots = await getBots()

      // case 2 : l1 > l2
      if(u_list_1.length > u_list_2.length){
        let sex_of_list = ""
        if(u_list_2.length >0){
          sex_of_list = u_list_2[0].sex
        }
        else{
          sex_of_list = u_list_1[0].my_match_sex
        }
        
        let same_sex_bots = get_same_sex_objects(all_bots,sex_of_list)

        let new_u_list_2 = []
        // fill new list with old list
        u_list_2.forEach((element) => new_u_list_2.push(element))
        
        let delta = u_list_1.length - u_list_2.length
        // we have more bots than we need
        if(same_sex_bots.length >= delta){
          let random_indexs = random_array_of_int(same_sex_bots.length)

          // add random same_sex_bots to new list 
          for(let i = 0; i < delta; i++){
            new_u_list_2.push(same_sex_bots[random_indexs[i]])
          }
          
        }
        // not enough bots
        else{
          //...
          let new_bots_list = []

          // fill with what we have
          same_sex_bots.forEach((bot) => new_bots_list.push(bot))

          let delta_bots = delta - same_sex_bots.length

          // re add extra bots to fit the len of list_2
          for(let i = 0; i < delta_bots; i++){
            new_bots_list.push(same_sex_bots[i])
          }

          let random_indexs = random_array_of_int(new_bots_list.length)

          // add random same_sex_bots to new list 
          for(let i = 0; i < delta; i++){
            new_u_list_2.push(new_bots_list[random_indexs[i]])
          }
        }

        // do same as ==
        
        const random_numbers_array_l1 = random_array_of_int(u_list_1.length)
        const random_numbers_array_l2 = random_array_of_int(new_u_list_2.length)


        for(let i =0; i < random_numbers_array_l1.length;i++){
          let index1 = random_numbers_array_l1[i]
          let index2 = random_numbers_array_l2[i]

          console.log([u_list_1[index1],new_u_list_2[index2]]);
          addMatch(u_list_1[index1].id,new_u_list_2[index2].id)
        }
        

      }


      // case 3 : l1 < l2 
      else if(u_list_1.length < u_list_2.length){
        let sex_of_list = ""
        if(u_list_1.length > 0){
          sex_of_list = u_list_1[0].sex
        }
        else{
          sex_of_list = u_list_2[0].my_match_sex
        }

        let same_sex_bots = get_same_sex_objects(all_bots,sex_of_list)

        let new_u_list_1 = []
        // fill new list with old list
        u_list_1.forEach((element) => new_u_list_1.push(element))
        
        let delta = u_list_2.length - u_list_1.length
        // we have more bots than we need
        if(same_sex_bots.length >= delta){
          let random_indexs = random_array_of_int(same_sex_bots.length)

          // add random same_sex_bots to new list 
          for(let i = 0; i < delta; i++){
            new_u_list_1.push(same_sex_bots[random_indexs[i]])
          }
          
        }
        // not enough bots
        else{
          //...
          let new_bots_list = []

          // fill with what we have
          same_sex_bots.forEach((bot) => new_bots_list.push(bot))

          let delta_bots = delta - same_sex_bots.length

          // re add extra bots to fit the len of list_2
          for(let i = 0; i < delta_bots; i++){
            new_bots_list.push(same_sex_bots[i])
          }

          let random_indexs = random_array_of_int(new_bots_list.length)

          // add random same_sex_bots to new list 
          for(let i = 0; i < delta; i++){
            new_u_list_1.push(new_bots_list[random_indexs[i]])
          }
        }

        // do same as ==
        
        const random_numbers_array_l1 = random_array_of_int(new_u_list_1.length)
        const random_numbers_array_l2 = random_array_of_int(u_list_2.length)

        for(let i =0; i < random_numbers_array_l1.length;i++){
          let index1 = random_numbers_array_l1[i]
          let index2 = random_numbers_array_l2[i]

          console.log([new_u_list_1[index1],u_list_2[index2]]);
          addMatch(new_u_list_1[index1].id,u_list_2[index2].id)
        }


      }

    }
    

  }

  function get_same_sex_objects(obj_list,wanted_sex){
    let my_list = []
    obj_list.forEach(
      (element) => {
        if(element.sex == wanted_sex){
          my_list.push(element)
        }
      }
    )
    return my_list
  }


  export async function addMatch(p1_id,p2_id){
    const data = {
      p1_id : p1_id,
      p2_id : p2_id,
      has_matched : false,
      shot_given : false,
      creation_time : Timestamp.now()
    }
  
    try{

      // check if match exists?
      // console.log(data);
      await addDoc(collection(firestore_db,"matching_table"),data)
      return(true)
    }catch(e){
      addError({
        e_message: "Failed to add match to matching_table firestore table.",
        program_execution: "Failed to execute firebase.addMatch(...)",
        program_function_error: `addMatch(${p1_id},${p2_id})`,
        program_page: "/admin/dashboard",
      })
      return(e)
    }
  
  }
  
  export async function updateMatch(docID,data){
    const documentRef = doc(firestore_db,"matching_table",docID)
  
    updateDoc(documentRef,data).then(
      () => {
        console.log('successfully updated match');
        return(true)
      }
    ).catch(
      (error) => {
        addError({
          e_message: "Failed to update matching data to matching_table firestore table.",
          error : `${error.message}`,
          program_execution: "Failed to execute firebase.updateMatch(docID,data)",
          program_function_error: `updateMatch(${docID},${data})`,
          program_page: "/admin/dashboard",
          user_document_id: `${docID}`
        })
        console.log(error);
        return(error)
      }
    )
  
    
  }


