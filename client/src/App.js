import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase/firbase";
import { toast } from "react-toastify";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./component/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserHistory from "./pages/user/UserHistory";
import UserRoute from "./component/routes/UserRoute";
import AdminRoute from "./component/routes/AdminRoute";
import UserPassword from "./pages/user/UserPassword";
import UserWishList from "./pages/user/UserWishList";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCategoryCreate from "./pages/admin/subCategory/SubCategoryCreate";

import { useEffect } from "react";
import {useDispatch} from 'react-redux'

//utils import
import { currentUser } from "../src/utils/auth";



function App() {
  const dispatch = useDispatch()

  //to check firebase auth state
  useEffect(()=>{
     const unsubscribe = auth.onAuthStateChanged(async user =>{
       if(user){
         const idTokenResult = await user.getIdTokenResult()
         currentUser(idTokenResult.token)  //frotend is sending token to backend
         .then((res) => {  
           console.log(res.data)                      //frontend got response as a promise from backend after varifying the token
           const {name,email,picture,role,_id}=res.data
           dispatch({
             type: "LOGGED_IN_USER",
             payload: {
               email,
               name:email.split('@')[0],
               picture,
               token: idTokenResult.token,
               role,
               _id
             },
           });
         })
         .catch((error) => toast.error(error.message));
 
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
        <UserRoute exact path='/user/history' component={UserHistory}/>
        <UserRoute exact path='/user/password' component={UserPassword}/>
        <UserRoute exact path='/user/wishlist' component={UserWishList}/>
        <AdminRoute exact path='/admin/dashboard' component = {AdminDashboard} />
        <AdminRoute exact path='/admin/category' component = {CategoryCreate} />
        <AdminRoute exact path='/admin/category/:slug' component = {CategoryUpdate} />
        <AdminRoute exact path='/admin/subCategory' component = {SubCategoryCreate} />
      </Switch>
    </>
  );
}

export default App;
