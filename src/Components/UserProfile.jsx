import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const navigate = useNavigate(); // utile pour changer de page (utilisé dans  action.js (AccessProfile apelé par LoginUser))

    const firstName = useSelector(state => state.userReducer.firstName);
    const lastName = useSelector(state => state.userReducer.lastName);
    console.log(`id : ${lastName}`)
    const id = useSelector(state => state.userReducer.id);


     useEffect(() => {
         document.title = `Argent Bank - ${firstName} ${lastName}`;  
    }, [firstName, lastName]); 

    // lors de la modificaiton du nom
    const handleClickEditName = (event) => {
        event.preventDefault();
        navigate('/edit-profile')
    }
    console.log(`id : ${lastName}`)
    if (!id) {
        //navigate(`/`)
        //return <Home />
    } 
  
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