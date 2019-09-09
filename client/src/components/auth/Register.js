import React, { Component } from 'react'
import axios from 'axios';

export default class Register extends Component {

    constructor(){
        super();
        this.onSubmitRegister=this.onSubmitRegister.bind(this);
        this.onChangeInput=this.onChangeInput.bind(this);
        this.state={
            user:{
                userName:'',
                password:'',
                confirmPassword:''
            },
            errorMessage:''
            
        }
    }
    

    onSubmitRegister=(event)=>{
        event.preventDefault();
        let user=this.state.user;

        axios.post('http://localhost:3001/user/register',user)
            .then(res=>{

                this.props.history.push('/login')
            })
            .catch(err=>{

                this.setState(prevState=>({

                    errorMessage:err.response.data.message,
                    user:{
                        ...prevState.user,
                        userName:'',
                        password:'',
                        confirmPassword:''
                    }

             
            }))
    })
    }


    onChangeInput=(event)=>{
        const {name,value}=event.target;
        this.setState((prevState)=>({
            user:{
                ...prevState.user,
                [name]:value
            },
            errorMessage:''
        })
        )
    }


    render() {
        let {errorMessage,user}=this.state;
        return (
            <React.Fragment>
                <div className='login-box d-flex-column justify-content-center shadow-lg bg-white'>
                    <div className='text-center login-heading'>Register</div>
                    {errorMessage && <div className='text-danger font-weight-bold small mt-4'>{errorMessage}</div>}
                    <form className='form mt-4' onSubmit={this.onSubmitRegister}>
                        <input type='text' name='userName' placeholder='User Name' required className='form-control my-3' onChange={this.onChangeInput} value={user.userName}/>
                        <input type='password' name='password' placeholder='Password' required className='form-control my-3' onChange={this.onChangeInput} value={user.password}/>
                        <input type='password' name='confirmPassword' placeholder='Confirm Password' required className='form-control 'onChange={this.onChangeInput} value={user.confirmPassword}/>
                        {user.confirmPassword!==user.password && user.confirmPassword!=='' && <span className='text-danger small'>Password do not match</span>}
                        <div className='text-center my-4' ><button type='submit' className='btn btn-sm btn-primary' disabled={user.password!==user.confirmPassword} >Submit</button></div>
                        
                    </form>

                    <div className='text-center small'>Already have account <a href='/login' >Login</a></div>

                </div>

            </React.Fragment>
        )
    }
}
