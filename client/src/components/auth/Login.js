import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.onChangeInput=this.onChangeInput.bind(this);
        this.state={
            user:{
                userName:'',
                password:''
            },
            isIncorrect:false,
            errorMessage:''
        }
    }
    
    //on change of input

    onChangeInput=(event)=>{
        event.preventDefault();
        let {name,value}=event.target;
        this.setState(prevState=>({
            user:{
                ...prevState.user,
                [name]:value
            },
            errorMessage:''
            
        }))
    }

    //posting to server on submit
    
    onSubmitLogin=(event)=>{
        event.preventDefault();
        let user=this.state.user;
        axios.post('user/login',user)
            .then(token=>{

                localStorage.setItem('jwt',token.data);
                localStorage.setItem('user',user.userName);
                this.props.setLogin();
                this.props.history.push('/');
            })
            .catch(err=>{
                console.log(err);
                this.setState(prevState=>({

                    errorMessage:err.response.data.message,
                    user:{
                        ...prevState.user,
                        userName:'',
                        password:''
                    }
                }))


            })
    }
    


    render() {
        const {user,errorMessage}=this.state;
        return (
        <React.Fragment>
            <div className='login-box d-flex-column justify-content-center shadow-lg bg-white'>
                <div className='text-center login-heading'>Login</div>
                {errorMessage && <div className='mt-4 text-danger font-weight-bold small'>{errorMessage}</div>}
                <form className='form mt-4' onSubmit={this.onSubmitLogin}>
                    <input type='text' name='userName'placeholder='User Name' required className='form-control my-3' onChange={this.onChangeInput} value={user.userName}/>
                    <input type='password' name='password' placeholder='Password' required className='form-control my-3' onChange={this.onChangeInput} value={user.password}/>
                    <div className='text-center my-4' ><button type='submit' className='btn btn-sm btn-primary' >Submit</button></div>
                    
                </form>

                <div className='text-center small'>Do not have Account <a href='/register' >Register</a></div>

            </div>
        </React.Fragment>
        )
    }
}
