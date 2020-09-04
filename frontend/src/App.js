import React from 'react';
import {observer} from 'mobx-react';
import UserStores from './stores/UserStore';
import LoginForm from './LoginForm';
import InputField from './InputField';
import SubmitButton from './SubmitButton'


import './App.css';
import UserStore from './stores/UserStore';

class App extends React.Component{

  async componentDidMount(){

    try {
      
      let res = await fetch('/isloggedIn',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
      
              }


      });
      let result = await res.json();
      if (result && result.success){
        UserStores.Loading = false;
        UserStores.isLoggedIn = true;
        UserStores.username= result.username;

      }
      else{
        UserStores.Loading= false;
        UserStores.isLoggedIn= false;

      }

    } catch (error) {
      
      UserStores.Loading= false;
      UserStores.isLoggedIn= false;
    }


  }


  async doLogout(){

    try {
      
      let res = await fetch('/logout',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
      
              }


      });
      let result = await res.json();
      if (result && result.success){
        UserStores.isLoggedIn = false;
        UserStores.username= '';

      }
     

    } catch (e) {
      
     console.log(e)
    }
  }

  render(){

    if(UserStores.loading){

      return(<div className="app">
        <div className= "container">
          Loading, please wait..
        </div>
      </div>

      );
    } else{
      if(UserStores.isLoggedIn){
        return(<div className="app">
        <div className= "container">
         Welcome {UserStore.username}
         <SubmitButton
         text={'Log out'}
         disabled={false}
         onClick = {() =>this.doLogout() }
         />
        </div>
      </div>

      );
      }
    }
  return (
    <div className="app">

        <div className="container" >
          <LoginForm/>

        </div>
    </div>
  );
}
}

export default observer(App);
