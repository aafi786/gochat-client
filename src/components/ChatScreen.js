import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from "./MessageList";
import SendMessageFrom from "./SendMessageForm";
import { message } from 'antd';
import HorNavbar from "./HorNavbar";
import TypingInd from "./TypingInd";
//import { message } from 'antd';


export default class ChatScreen extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            currentUser: {},
            currentRoom: {},
            userWhoAreTyping: []
        }
        this.MessageSend = this.MessageSend.bind(this);
        this.sendTyping = this.sendTyping.bind(this);
        this.deletemsg = this.deletemsg.bind(this);
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:4bf0b57e-fdb6-43ca-a867-22bfe90dbf14',
            userId: this.props.currentUsername,
            tokenProvider: new TokenProvider({
                url: '/auth',
                queryParams: {

                    "grant_type": "client_credentials",
                    "user_id": this.props.currentUsername

                }

            })
        })




        chatManager.connect()
            .then(currentUser => {

                this.setState({ currentUser });
                currentUser.subscribeToRoom({
                    roomId: '19376518',
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                userWhoAreTyping: [...this.state.userWhoAreTyping, user.name]
                            })

                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                userWhoAreTyping: this.state.userWhoAreTyping.filter(username => username !== user.name)
                            })
                        }
                    },
                    messageLimit: 10
                })
                    .then(currentRoom => {
                        this.setState({ currentRoom })
                        message.success('Succesfully Connected To Room ' + currentRoom.name);
                    })
            })
            .catch(err => {
                console.log('Error on connection', err)
            })
    }
    MessageSend(message) {

        this.state.currentUser.sendMessage({
            text: message,
            roomId: this.state.currentRoom.id
        })
            .then(messageId => {
                console.log(`Added message to ${this.state.currentRoom.name}`)
            })
            .catch(err => {
                console.log(`Error adding message to ${this.state.currentRoom.name}: ${err}`)
            })


    }
    sendTyping() {
        this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id })
            .then(() => { })
            .catch(err => {
                console.log(`Error sending typing indicator: ${err}`)
            })
    }

    deletemsg(id) {
        console.log('delete msg id :' + id)
        fetch('/delete-msg', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ msg: id })
        })
            .then(response => {
                this.state.currentUser.fetchMessages({
                    roomId: '19376518',
                    limit: 100,
                })
                    .then(messages => {

                        this.setState({
                            messages: [...this.state.messages, messages]
                        })

                    })
                    .catch(err => {
                        console.log(`Error fetching messages: ${err}`)
                    })
                console.log('success');


            })
            .catch(error => { console.log(error) })
    }

    render() {
        return (
            <div>
                <HorNavbar usern={this.props.currentUsername} />
                <div className="main">
                    <div className="main-left"></div>
                    <div className="main-right">
                        <div className="main-right-top">
                            <TypingInd usersWhoAreTyping={this.state.userWhoAreTyping} />
                            <MessageList delmsg={this.deletemsg} messages={this.state.messages} />
                            {/* <p>{JSON.stringify(this.state.userWhoAreTyping)}</p> */}
                        </div>
                        <div className="main-right-bottom footer">
                            <SendMessageFrom onSubmitMsg={this.MessageSend} onChange={this.sendTyping} />
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}