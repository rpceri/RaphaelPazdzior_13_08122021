import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'; // C’est grâce au Provider que useDispatch et useSelector auront accès au store. il doit englober toute l'app et attend une prop store store Redux
import configureStore from './configureStore.js'; // utile pour provider


const store = configureStore(); // reduxDevtools = connecte le store aux Devtools automatiquement

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// to add header lien to font-awsome :
const link = document.createElement("link");
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
link.type = "text/css";
link.rel = "stylesheet";

document.getElementsByTagName("head")[0].appendChild(link);