import React, { Component } from "react";
import { message } from 'antd';

export default class TypingInd extends Component {
    render() {
        const { usersWhoAreTyping } = this.props
        const zro = usersWhoAreTyping[0];
        const jon = usersWhoAreTyping.join('and');
        if (this.props.usersWhoAreTyping.length === 0) {
            return <div>{message.destroy()}</div>
        }
        else if (this.props.usersWhoAreTyping.length === 1) {
            return message.info(`${zro} is typing..`, null);
        }
        else if (this.props.usersWhoAreTyping > 1) {
            message.info(`${jon} are typing..`, null);
        }
    }
}