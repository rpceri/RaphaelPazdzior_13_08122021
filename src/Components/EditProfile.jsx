import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { RecordChange } from "../actions.js";

/**
 * Return template of form to edit profile (update first or lastname)
 *
 * @component
 * @summary imported in Route
 * @param {  }
 * @return { HTMLElement }
*/
function EditProfile() {
    const dispatchOfUseDispatch = useDispatch();
    const navigate = useNavigate(); // utile pour changer de page

    const firstName = useSelector(state => state.firstName);
    const lastName = useSelector(state => state.lastName);

    const token = useSelector(state => state.token);
    //console.log(lastName)
    const [newFirstName, setNewFirstName] = useState(firstName); // pour enregistrer les nouvelles valeurs
    const [newLastName, setNewLastName] = useState(lastName);

    const [inputError, setInputError] = useState('');

    function validate () {
        let errorMsg = '';;
        if (!newFirstName && !newLastName) { errorMsg = 'Fist name and last name are obligatory' }
        else if (!newFirstName) { errorMsg = 'Fist name is obligatory' }
        else if (!newLastName) { errorMsg = 'Last name is obligatory' }

        if (errorMsg) {
            setInputError(errorMsg);
            return false;
        }
        return true;
    }
   
    const handleSubmit = (event) => {
        event.preventDefault();
        if(validate()) dispatchOfUseDispatch(RecordChange(token, newFirstName, newLastName, navigate));
    }

    return (
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
                            value={newFirstName}
                            onChange={(event) => setNewFirstName(event.target.value)}
                        />
                        <input
                            placeholder="Last Name"
                            name="lastName"
                            type="text"
                            id="lastName"
                            value={newLastName}
                            onChange={(event) => setNewLastName(event.target.value)}
                        />                        
                    </div>
                    { inputError ? <div className="form-error2">{inputError}</div> : null  }  
                    <button className="sav-button" type="submit">Save </button>
                </form>
                </div>
            </main>
        )
}

export default EditProfile;