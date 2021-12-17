import {createStore } from 'redux';
import { combineReducers } from 'redux'; // permet d’organiser le state en attribuant chaque partie du state à un sous-reducer différent.
// meme avec combineReducers, les reducers vont recevoir toutes les actions que l’on dispatch  .
//import { routerReducer } from 'react-router-redux'; //https://github.com/reactjs/react-router-redux

export default function configureStore(preloadedState) {
    const store = createStore(allReducers, preloadedState); // on crée le store avec le reducer et le state 
    return store;
}

//un Reducer Redux est une fonction qui reçoit le state et une action en paramètre, et qui retourne un nouveau state
const userReducer = (state = {status: '' , email: '', firstName: '', lastName: ''}, action) => {
            return state;
}

const loginReducer = (state = {token: '', status: '', message: ''}, action) => { // utilisé dans Signin dans un useSelector
            return state;

}

const allReducers = combineReducers({
    userReducer: userReducer,
    loginReducer: loginReducer
}) //objet en praamtre : Cet objet va permettre d’indiquer, pour chaque propriété du state, quel reducer utiliser :
