import React, { Component } from 'react'

export default class ListMessages extends Component {

    render() {
        // console.log(this.props.itemData._id);
        let {userName,message}=this.props.itemData;
        let mClass=(userName===localStorage.getItem('user'))?'ml-auto':'mr-auto';
        return (
            <div  className={'m-1 p-1 d-flex bg-white flex-column rounded '+mClass}>
                <div className={'text-warning ml-2  '}>{(userName===localStorage.getItem('user'))?'You':userName} </div>
                <div className={'ml-2 message'}>{message}</div>
            </div>
        )
    }
}

