import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';



function EditProfile() {


    const firstName = useSelector(state => state.userReducer.firstName);
    const lastName = useSelector(state => state.userReducer.lastName);


    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    const [newFirstNameError, setNewFirstNameError] = useState('');
    const [newLastNameError, setNewLastNameError] = useState('');

    const validate = () => {

        let newFisrtNameErrorMessage = '';
        let newLastNameErrorMessage = '';

        if (!newFirstName) { newFisrtNameErrorMessage = 'obligatory' };
        if (!newLastName) { newLastNameErrorMessage = 'obligatoryy' };

        if (newFisrtNameErrorMessage || newLastNameErrorMessage) {
            setNewFirstNameError(newFisrtNameErrorMessage);
            setNewLastNameError(newLastNameErrorMessage);
            return false;
        }

        return true;
    };
   
    const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = validate();
        //if(isFormValid) dispatch(modifyName(token, newFirstName, newLastName));
    }

    return (
        <>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br /></h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-edit">
                        <input
                            placeholder="First Name"
                            name="firstName"
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(event) => setNewFirstName(event.target.value)}
                        />
                        { newFirstNameError ? <div className="form-error">{newFirstNameError}</div> : null  }  

                        <input
                            placeholder="Last Name"
                            name="lastName"
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(event) => setNewLastName(event.target.value)}
                        />
                        { newLastNameError ? <div className="form-error">{newLastNameError}</div> : null  }  
                    </div>
                    <button className="sav-button" type="submit">Save</button>
                </form>
                </div>
            </main>
            </>
        )
}

export default EditProfile;