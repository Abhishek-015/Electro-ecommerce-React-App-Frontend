import {Switch,Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Header from './component/nav/Header';


function App() {
  return (
    <>
      <Header/>
     <Switch>
       <Route exact path='/' component={Home}/>
       <Route path='/register' component={Register}/>
       <Route path='/login' component={Login}/>
     </Switch>
    </>
  );
}

export default App;
