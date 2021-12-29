import {applyMiddleware, createStore, compose } from 'redux';
import thunk from "redux-thunk" 



export default function configureStore() {

    const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // https://openclassrooms.com/fr/courses/7150626-utilisez-le-state-manager-redux-pour-gerer-l-etat-de-vos-applications/7286859-tirez-profit-des-redux-devtools
    const createStoreWithMiddleware = compose(applyMiddleware(thunk), reduxDevtools)(createStore);
    const store = createStoreWithMiddleware(reducer);    //permet d'ajouter reduxDevTools, Source: https://prograide.com/pregunta/70298/sur-react-router-comment-garder-letat-de-connexion-mme-en-rafrachissant-la-page
 
    //const store = createStore(reducer,  applyMiddleware(thunk)); // on crée le store avec le reducer et le state 
    return store;
}

//un Reducer Redux est une fonction qui reçoit le state et une action en paramètre, et qui retourne un nouveau state
/* retourné par profile :
    "status": 200,
    "message": "Successfully got user profile data",
    "body": {
      "email": "steve@rogers.com",
      "firstName": null,
      "lastName": "zozo",
      "createdAt": "2021-12-14T09:28:29.367Z",
      "updatedAt": "2021-12-17T09:31:29.181Z",
      "id": "61b863bd8f866272308fcab6"
    }
après une maj par le put :
{
  "status": 200,
  "message": "Successfully updated user profile data",
  "body": {
    "email": "steve@rogers.com",
    "firstName": null,
    "lastName": "lolo",
    "createdAt": "2021-12-14T09:28:29.367Z",
    "updatedAt": "2021-12-23T21:27:12.271Z",
    "id": "61b863bd8f866272308fcab6"
  }
}

 retourné par login :
    "status": 200,
    "message": "User successfully logged in",
    "body": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjg2M2JkOGY4NjYyNzIzMDhmY2FiNiIsImlhdCI6MTY0MDAzNjAwMiwiZXhwIjoxNjQwMTIyNDAyfQ.wTuCSspXXyogio9uffTBGuxEi7UAzBipTWq3ykuIitw"
    }
*/
const reducer = (state = {status: '' , email: '', firstName: '', lastName: '', token: '', message: ''}, action) => {
    if(action.type === 'RECEIVE_DATA') {
        return state = {
            status: action.payload.status,
            email: action.payload.data.email,
            firstName: action.payload.data.firstName,
            lastName: action.payload.data.lastName,

            token: action.payload.token,
            message: action.payload.message
        }
    }
    else if(action.type === 'RESET_DATA') {
        //alert('RESET_DATA')
        console.log('action RESET_DATA')
        return state = {
            token: null
        }
    }



    else if(action.type === 'LOGIN_SUCCESS') {
        //alert('LOGIN_SUCCESS')
        return state = {
            token: action.payload.token,
            status: action.payload.status,
            message: action.payload.message
        }
    }
    else if(action.type === 'API_FAILURE') {
        alert('API_FAILURE')
        return state = {
            token: null,
            status: action.payload.status,
            message: action.payload.message
        }
    }
    // reset redux state if logout
    else if (action.type === 'USER_LOGGED_OUT') {
        return state = {
            token: null
        }
    }
 
    else {
        //alert('ACTION INCONNUE')
        return {...state}
    }
    
}

/*
const loginReducer = (state = {token: '', status: '', message: ''}, action) => { // utilisé dans Signin dans un useSelector
    else if(action.type === 'LOGIN_SUCCESS') {
        //alert('LOGIN_SUCCESS')
        return state = {
            token: action.payload.token,
            status: action.payload.status,
            message: action.payload.message
        }
    }
    else if(action.type === 'API_FAILURE') {
        alert('API_FAILURE')
        return state = {
        token: null,
        status: action.payload.status,
        message: action.payload.message
        }
    }
    // reset redux state if logout
    else if (action.type === 'USER_LOGGED_OUT') {
        state = undefined;
    }
    else {
       // alert('ACTION INCONNUE')
        return state
    }

}

// cf https://openclassrooms.com/fr/courses/7150626-utilisez-le-state-manager-redux-pour-gerer-l-etat-de-vos-applications/7286857-utilisez-combinereducers-pour-faciliter-l-ajout-de-nouvelles-fonctionnalites
// l' objet en paramètre va permettre d’indiquer, pour chaque propriété du state, quel reducer utiliser :
const allReducers = combineReducers({
    userReducer: userReducer,
    loginReducer: loginReducer
}) //objet en parametre : Cet objet va permettre d’indiquer, pour chaque propriété du state, quel reducer utiliser :

*/