import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase/firbase";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./component/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";

import { useEffect } from "react";
import {useDispatch} from 'react-redux'



function App() {
  const dispatch = useDispatch()

  //to check firebase auth state
  useEffect(()=>{
     const unsubscribe = auth.onAuthStateChanged(async user =>{
       if(user){
         const idTokenResult = await user.getIdTokenResult()
         console.log(user)
         dispatch({
           type:"LOGGED_IN_USER",
           payload:{
             email:user.email,
             token:idTokenResult.token
           }
         })
       }
     })
     return ()=>unsubscribe()
  },[])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword}/>
      </Switch>
    </>
  );
}

export default App;
