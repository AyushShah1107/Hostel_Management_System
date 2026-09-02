import { BrowserRouter } from 'react-router-dom';
import classes from './CSSfiles/mainFile.module.css'
import { Route,Routes } from 'react-router-dom';
import { PrivateComponent } from './components/PrivateComponent';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { LaunchPage } from './components/MainLaunchPage';
import { RateFood } from './components/RateMessFood';
import { Complains } from './components/allComplains';
import { ComplainForm } from './components/ComplainForm';
import { ForgotPassword } from './components/ForgotPassword';
import { Community } from './components/community';

function App() {
  
  return (
   <div className={classes.mainDIV}> 
      <BrowserRouter>
      <Routes>
        <Route element={<PrivateComponent></PrivateComponent>}>
        <Route path='/ratemessfood' element={<RateFood></RateFood>}></Route>
        <Route path='/' element={<LaunchPage></LaunchPage>}></Route>
        <Route path='/complainform' element={<ComplainForm></ComplainForm>}></Route>
        <Route path='/complains' element={<Complains></Complains>}></Route>
         <Route path='/community' element={<Community></Community>}></Route>

        </Route>
       
        <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>


        <Route path='/login' element={<Login></Login>}></Route>

        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
