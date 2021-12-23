import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { resetFailure } from './actions.js';

function UserProfile() {
    const navigate = useNavigate(); // utile pour changer de page
    const dispatchOfUseDispatch = useDispatch(); 

    const firstName = useSelector(state => state.firstName);
    const lastName = useSelector(state => state.lastName);
    //console.log(`id : ${lastName}`)
    const status = useSelector(state => state.status);


     useEffect(() => {
         document.title = `Argent Bank - ${firstName} ${lastName}`; 

         if (!status) { // si le status 'nest pas bon on redirige sur l'accieuil
            dispatchOfUseDispatch(resetFailure())
            navigate(`/`)  //!!!!!!!!!!!!! si pas dans le useEffect : You should call navigate() in a React.useEffect(), not when your component is first rendered.
            console.log('oupppps')
        } 
    }, [firstName, lastName, status, dispatchOfUseDispatch, navigate]); 

    // lors de la modification du nom
    const handleClickEditName = (event) => {
        event.preventDefault();
        navigate('/edit-profile')
    }
    //console.log(`id : ${lastName}`)


    return (
        <>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br /> {firstName} {lastName} !</h1>
                    <button className="edit-button" onClick={handleClickEditName}>Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        </>
        
    )
}

export default UserProfile;