import React from 'react'
import LT_TEXT from '../../resources/text_love_therapy_nobg.png'
import { Link } from 'react-router-dom'

export default function TermsAndServices() {
  return (
    <div className='container mx-auto grid'>
        
        <div className='mx-auto'>
            <Link className='' to={'/'}><img alt='' src={LT_TEXT} className='max-w-[250px]'/></Link>
        </div>

        <div>
            <h1 className= 'font-bold text-3xl'>Conditions d'utilisation</h1>
            <h3 className='p-2 text-xl'>Dernière mise à jour : 04 feb 2024</h3>

            <div id='paragraphes' className='grid px-5 gap-5'>

                <div className=''>
                    
                    <p>
                    Bienvenue sur <span className='font-bold'>Love Therapy</span> ! 
                    Ces Conditions d'utilisation ("Conditions") régissent votre utilisation du site web et 
                    des services de Love Therapy ("Service") fournis par Pro Web Solutions ("nous," "notre," ou "nos").
                    En accédant ou en utilisant notre Service, vous acceptez d'être lié par ces Conditions. 
                    Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser le Service.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>1. Inscription au Compte</h3>
                    <p>
                    1.1 Vous devez avoir au moins 18 ans pour utiliser notre Service.

                    <br/><br/>1.2 Vous acceptez de fournir des informations précises, actuelles et complètes lors du processus d'inscription.

                    <br/><br/>1.3 Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe, et de restreindre l'accès à votre compte.
                    Vous acceptez d'assumer la responsabilité de toutes les activités qui se produisent sous votre compte.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>2. Informations Personnelles</h3>
                    <p>
                    2.1 Pour utiliser certaines fonctionnalités du Service, vous pourriez être amené à fournir des informations personnelles,
                    notamment votre adresse e-mail et votre numéro de téléphone.

                    <br/><br/>2.2 En fournissant vos informations personnelles, vous consentez à la collecte,
                    au traitement et au stockage de ces informations conformément à notre <a href='#politique' className='text-blue-500 underline'>Politique de confidentialité</a>.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>3. Caractéristiques et Mise en Relation</h3>
                    <p>
                    3.1 Les utilisateurs peuvent entrer trois caractéristiques physiques pour se définir.

                    <br/><br/>3.2 Le processus de mise en relation a lieu à la fin d'une minuterie, et les utilisateurs reçoivent un code QR à scanner pour trouver leur partenaire significatif.

                    <br/><br/>3.3 Nous ne pouvons garantir l'exactitude ou le succès du processus de mise en relation, et les utilisateurs participent à leur propre discrétion.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>4. Code de Conduite</h3>
                    <p>
                    4.1 Les utilisateurs acceptent d'utiliser le Service conformément aux lois et réglementations applicables.

                    <br/><br/>4.2 Les utilisateurs ne doivent pas s'engager dans des activités qui pourraient nuire, interférer ou compromettre l'intégrité du Service.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>5. Résiliation</h3>
                    <p>
                    5.1 Nous nous réservons le droit de résilier ou de suspendre votre compte et
                    l'accès au Service pour n'importe quelle raison, sans préavis.

                    <br/><br/>5.2 En cas de résiliation, votre droit d'utiliser le Service prendra fin immédiatement.                
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>6. Abonnement à la Newsletter</h3>
                    <p>
                    6.1 En vous inscrivant à notre newsletter, vous consentez à recevoir des informations, des mises à jour et des promotions de la part de Love Therapy.

                    <br/><br/>6.2 Vous pouvez vous désabonner de la newsletter à tout moment en suivant les instructions fournies dans chaque communication.              
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>7. Modifications des Conditions</h3>
                    <p>
                    7.1 Nous nous réservons le droit de mettre à jour ou de modifier ces Conditions à tout moment. Veuillez consulter périodiquement ces Conditions pour prendre connaissance des changements.

                    <br/><br/>7.2 Votre utilisation continue du Service après toute modification de ces Conditions constitue votre acceptation des Conditions révisées.

                    Pour des informations plus détaillées sur la manière dont nous collectons, utilisons et protégeons vos informations, veuillez vous référer à notre Politique de confidentialité.

                    Si vous avez des questions ou des préoccupations concernant ces Conditions, veuillez nous contacter à prowebsolutions.belgique@gmail.com.

                    Merci d'utiliser Love Therapy !                
                    </p>
                </div>


            </div>
        </div>

        <div className='py-10'>
            <h1 id='politique' className= 'font-bold text-3xl'>Politique de Confidentialité</h1>
            <h3 className='p-2 text-xl'>Dernière mise à jour : 04 feb 2024</h3>

            <div id='paragraphes' className='grid px-5 gap-5'>

                <div className=''>
                    
                    <p>
                    Bienvenue sur <span className='font-bold'>Love Therapy</span> ! 
                    Cette Politique de Confidentialité explique comment nous collectons, utilisons, 
                    divulguons et protégeons vos informations lorsque vous utilisez notre site web et nos services (le "Service").

                    <br/><br/>En utilisant le Service, vous consentez à la collecte et à l'utilisation de vos informations conformément à cette Politique de Confidentialité. Si vous n'acceptez pas les termes de cette Politique, veuillez ne pas utiliser le Service.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>1. Informations Collectées</h3>
                    <p>
                    1.1 <span className='font-bold'>Informations Personnelles :</span> Lors de l'inscription et de l'utilisation du Service, nous pouvons collecter des informations personnelles telles que votre nom, adresse e-mail, numéro de téléphone et caractéristiques physiques.

                    <br/><br/>1.2 <span className='font-bold'>Informations d'utilisation :</span> Nous pouvons collecter des informations sur la manière dont vous utilisez le Service, y compris les caractéristiques que vous définissez, les interactions avec d'autres utilisateurs et les données de connexion.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>2. Utilisation des Informations</h3>
                    <p>
                    2.1 Nous utilisons vos informations pour fournir, maintenir et améliorer le Service, ainsi que pour personnaliser votre expérience.

                    <br/><br/>2.2 Les informations collectées peuvent être utilisées pour vous envoyer des informations, des mises à jour et des promotions liées à Love Therapy, y compris des newsletters si vous avez souscrit à notre service d'abonnement.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>3. Partage d'Informations</h3>
                    <p>
                    3.1 Nous ne vendons pas, ne louons pas, et ne partageons pas vos informations personnelles avec des tiers sans votre consentement, sauf tel que décrit dans cette Politique de Confidentialité.

                    <br/><br/>3.2 Vos caractéristiques physiques seront utilisées uniquement dans le cadre du processus de mise en relation, et aucune information sensible ne sera partagée publiquement.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>4. Sécurité des Informations</h3>
                    <p>
                    4.1 Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations contre tout accès non autorisé, altération, divulgation ou destruction.
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>5. Cookies et Technologies Similaires</h3>
                    <p>
                    5.1 Nous utilisons des cookies et d'autres technologies similaires pour faciliter votre expérience de navigation et personnaliser le contenu du Service.                
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>6. Liens vers des Sites Tiers</h3>
                    <p>
                    6.1 Le Service peut contenir des liens vers des sites tiers. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites et vous encourageons à consulter leurs politiques de confidentialité.       
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>7.  Modifications de la Politique de Confidentialité</h3>
                    <p>
                    7.1 Nous nous réservons le droit de mettre à jour ou de modifier cette Politique de Confidentialité à tout moment. La date de la dernière mise à jour sera indiquée en haut de la page.

                    <br/><br/>7.2 Votre utilisation continue du Service après toute modification de cette Politique de Confidentialité constitue votre acceptation des modifications.             
                    </p>
                </div>

                <div className=''>
                    <h3 className='font-bold text-xl text-[var(--colorPrimary)]'>8. Nous Contacter</h3>
                    <p>
                    8.1 Si vous avez des questions, des préoccupations ou des demandes concernant cette Politique de Confidentialité, veuillez nous contacter à prowebsolutions.belgique@gmail.com.

                    <br/><br/>Merci d'utiliser Love Therapy !

         
                    </p>
                </div>


            </div>
        </div>




    </div>
  )
}
