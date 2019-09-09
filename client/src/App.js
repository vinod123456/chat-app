import React from 'react';
import {BrowserRouter as Router,Route,Switch,NavLink} from 'react-router-dom'
import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Chat from './components/Chat';

class App extends React.Component{

  constructor(){
    super();
    this.setLogin=this.setLogin.bind(this);
    this.logout=this.logout.bind(this);
    this.state={
      loginStatus:false
    }
  }

  logout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    // this.setState({loginStatus:false})
    this.setLogin();
    
  }
  setLogin(){
    this.setState({loginStatus:!this.state.loginStatus});
  }
  
  render(){
    const jwt=localStorage.getItem('jwt');
  return (
    <Router>
      <React.Fragment>
          <div className='navbar bg-dark'>
            <NavLink to='/' className='navbar-brand text-white font-weight-bold'>Application</NavLink>
            {!jwt && <NavLink to='/login' className='btn float-right '>Login/Register</NavLink>}
            {jwt && <NavLink to='/login' className='btn float-right ' onClick={this.logout}>Logout</NavLink>}
          </div>
          <div className="container">
            <Switch>
              <Route exact path='/login' render={(props)=><Login {...props} setLogin={this.setLogin}/>}/>
              <Route exact path='/register' component={Register}/>
              <Route path='/'  component={Chat}/>

            </Switch>
          </div>
        </React.Fragment>
    </Router>
  );
}
}

export default App;
