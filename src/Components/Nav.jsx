import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { LogoutRequest } from './actions.js';

function Nav() {
    const dispatchOfUseDispatch = useDispatch(); 

    const status = useSelector(state => state.status); // utilisé grace au <Provider>,  custom hooks,  qui recoit le state en argument et doit retourner une partie de ce state.
                                                                   // pour extraire des morceaux de state et mettre à jour le composant en cas de changement de state.
    const user = useSelector(state => `${state.firstName} ${state.lastName}`);   

    const handleLogOut = () => {
        dispatchOfUseDispatch(LogoutRequest());   
    }

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
                <i className="fa fa-user-circle"></i> {status === 200 ? user : 'Sign In'}
                </NavLink>

                {status === 200 ? <NavLink className="main-nav-item" to="/" onClick={handleLogOut}>
                                    <i className="fa fa-sign-out"></i>
                                    Sign Out
                </NavLink> : ''}

                {status !== 200 ? <NavLink className="main-nav-item" to="/sign-up">
                                    <i className="fa fa-sign-in"></i>
                                    Sign Up
                </NavLink> : ''}
            </div>
        </nav>
    </>
    
    )
}

export default Nav;