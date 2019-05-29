import React, { Component } from 'react';
import './App.css';
import UsernameForm from "./components/UsernameForm";
import ChatScreen from "./components/ChatScreen";


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }
  onUsernameSubmitted(username) {
    fetch('/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username })
    })
      .then(response => {
        console.log('success');
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })

      })
      .catch(error => { console.log(error) })
  }
  render() {

    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    }
    else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }



  }
}

export default App;
