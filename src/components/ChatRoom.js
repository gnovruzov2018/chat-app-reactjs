/**
 * Created by Gadir on 7/10/2017.
 */
import React, { Component } from 'react';

class ChatRoom extends Component {
    constructor(props, context) {
        super(props, context)
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.state = {
            message: '',
            messages: []

        }

    }
    updateMessage(event){
        console.log('u'+event.target.value);
        this.setState({message: event.target.value});
    }
    submitMessage(event){
        console.log(this.state.message);
        const nextMessage = {
            id: this.state.messages.length,
            text: this.state.message
        }
        firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
        // var list = Object.assign([], this.state.messages);
        // list.push(nextMessage);
        // this.setState({
        //     messages: list
        // })
    }
    componentDidMount(){
        console.log('componentDidMount');
        firebase.database().ref('messages/').on('value', (snapshot) => {
            const currentMessages = snapshot.val();
            if(currentMessages != null){
                this.setState({messages: currentMessages})
            }
        })
    }
    render(){
        const currentMessages = this.state.messages.map((message,i) => {
            return(
                <li key={message.id}>{message.text}</li>
            );
        })
        return(

            <div>
                <ol>
                    {currentMessages}
                </ol>
                <input onChange={this.updateMessage} type="text" placeholder="Message"/>
                <br/>
                <button onClick={this.submitMessage}>Submit Message</button>
            </div>
        );
    }
}
export default ChatRoom;