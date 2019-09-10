import React, { Component } from 'react'
import axios from 'axios';

import ListMessages from './ListMessages';
// import { stringify } from 'querystring';

export default class Chat extends Component {

    constructor(){
        super();
        this.renderMessages=this.renderMessages.bind(this);
        this.state={
            messages:[{}],
            message:''
        }
    }

    UNSAFE_componentWillMount(){
        if(!localStorage.getItem('jwt')){
            this.props.history.push('/login');
        }
        this.loadMessages();

    }
    

    loadMessages=()=>{
        axios.get('chat/messages')
            .then(response=>{
                this.setState({
                    messages:response.data
                })
            })
    }

    onChangeMessage=(event)=>{
        this.setState({message:event.target.value})
    }

    onEnter=(event)=>{
        // event.preventDefault();
        if(event.key==='Enter'){
            this.submit(event);
        }
    }

    submit=(event)=>{
        event.preventDefault();
        let data={};
        data.message=this.state.message;
        data.token=localStorage.getItem('jwt');
        this.setState({message:''});
        axios.post('chat/message',data)
            .then(res=>{
                this.loadMessages();
            })
            .catch(err=>{
                console.log(err.response);
            })
    }

    renderMessages=()=>{
        // console.log(this.state.messages);
        return this.state.messages.slice(0).reverse().map(item=>
            <ListMessages key={item._id} itemData={item}/>
        )
    }

    render() {
        let {message}=this.state;
        return (
            <React.Fragment>
                <div className='chat-overlay shadow-lg'>
                    <div className='chat-box d-flex flex-column align-content-around'>
                        <div className='bg-dark text-white p-2 text-center font-weight-bold mb-auto'>Chat Room</div>
                        <div className='d-flex flex-column-reverse p-1 message-box'>
                           {this.renderMessages()}
                        </div>        
                        <div className='bg-white small p-1 d-flex'>
                            <input className='message-input' placeholder='Enter Message' value={message} onChange={this.onChangeMessage} onKeyUp={e=>this.onEnter(e)}/>
                            <i className="fas fa-paper-plane align-self-center" onClick={this.submit}></i></div>
                    </div>
                    <div className='chat-online'>
                        <div className=' p-2 text-center small font-weight-bold border-bottom mb-auto'>Users Online</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
