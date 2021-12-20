import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from './actions.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


function SignIn() {

  const dispatch = useDispatch();

  const status = useSelector(state => state.loginReducer.status); //pour savoir si le status est 200
  const message = useSelector(state => state.loginReducer.message);  // si status = 400 on aura le message "Error: Password is invalid

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let [errorMsg, seterrorMsg] = useState(''); // pour afficher un message derreur si champs mal renseigné

  /**
   * @summary fonction permettant de valider la saisie du formulaire
   * 
   * @returns { Boolean }
   */
  const validate = () => {
    let errorMessage = '';

    if (!email && !password) { errorMessage = 'Enter your email and your password' }  
    else if (!email) { errorMessage = 'Enter your email' } 
    else if (!password) { errorMessage = 'Enter your password' }
    if (errorMessage) { seterrorMsg(errorMessage); return false;}

    return true;
  };
   
  // lors de la soumision du formulaire
  const handleSubmit = (event) => {
      event.preventDefault();
      if (validate()) dispatch(loginUser(email, password));// On envoie l'action avec dispatch si le formulaire est bienr enseigné
  };
    
  useEffect(() => {
    document.title = "Argent Bank - Sign In"
    }, []); 
  
    return (
        <>
            <main className="main bg-dark">
              <section className="sign-in-content">
                { /* <i className="fa fa-user-circle sign-in-icon"></i> */ }
                <FontAwesomeIcon icon={solid('user-circle')} />
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}> { /*ajout d'un onsubmit pour soumission formulaire */}
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} /> { /* remplace nom id et ajout onchange + htmlFor */}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"  value={password} onChange={(event) => setPassword(event.target.value)}  />{ /* ajout onChange + htmlFor */}
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    <div className="form-error"> 
                    { errorMsg ? errorMsg : null  }  
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
                {status && status !== 200 ? <h3 className="error-login">{message}</h3> : null }
              </section>
            </main>
    </>
    )
}

export default SignIn;