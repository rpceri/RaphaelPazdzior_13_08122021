
  import {BrowserRouter, Route, Routes} from "react-router-dom"; // in react-router-dom v6, "Switch" is replaced by routes "Routes"
  
  import Home from "./Components/Home.jsx";
  import SignIn from "./Components/SignIn.jsx";
  import UserProfile from "./Components/UserProfile.jsx";
  import EditProfile from "./Components/EditProfile.jsx";

  import Nav from './Components/Nav.jsx';
  import Footer from './Components/Footer.jsx';
  function RoutesApp() {
      return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/user" element={<UserProfile />}></Route>
                <Route path="/edit-profile" element={<EditProfile />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>

      )
  }
  
  export default RoutesApp;