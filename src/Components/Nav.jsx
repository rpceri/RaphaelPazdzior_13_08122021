
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'; //useDispatch


function Nav() {
    //const dispatch = useDispatch(); //  utilisé grace au <Provider>, custom hooks  pour récupérer la fonction dispatch de redux (retourne la fonction dispatch  de notre store Redux.)
                                    // pour envoyer des actions depuis les composants.

    const status = useSelector(state => state.userReducer.status); // utilisé grace au <Provider>,  custom hooks,  qui recoit le state en argument et doit retourner une partie de ce state.
                                                                   // pour extraire des morceaux de state et mettre à jour le composant en cas de changement de state.
    const user = useSelector(state => state.userReducer.firstName);
       
    return (
    <>
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                className="main-nav-logo-image"
                src={`${process.env.PUBLIC_URL}/img/argentBankLogo.png`}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div className="main-nav-link">
                <NavLink className="main-nav-item" to={status === 200 ? `/user` : '/sign-in'}>
                <i className="fa fa-user-circle"></i> Sign In
                </NavLink>
            
            </div>
        </nav>
    </>
    
    )
}

export default Nav;