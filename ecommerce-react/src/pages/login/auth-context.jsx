import { useEffect, useState } from "react";
import {AuthContext} from '../../App';


export function AuthContextProvider(props){
    const {children} = props;

const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem("auth")) || {});


  useEffect(() => {
    window.localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

function logOut(){
  window.localStorage.removeItem('auth');
  setAuth({});

}
  return(
    <AuthContext.Provider value={{auth, setAuth, logOut}}>
        { children }
      
    </AuthContext.Provider>
   
  )
  }