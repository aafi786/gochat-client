import React, { Component } from "react"
import {
    Comment, Tooltip
} from 'antd';
import { message } from 'antd';

// import { Spin } from 'antd';
import moment from 'moment';

export default class MessageList extends Component {
    constructor(props) {

        super(props);
        this.state = {
            mssg: this.props.messages
        }
        this.confirm = this.confirm.bind(this)
    }
    render() {
        // console.log(this.props.message);

        function confirm(e) {
            console.log(e.target.id);

            fetch('/delete-msg', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ msg: e.target.id })
            })
                .then(() => {

                    message.success('Message Deleted')
                })
                .catch(err => console.error(err))

        }


        return (

            <ul>

                {this.state.mssg.map((message, index) => (
                    <Comment key={index}
                        author={(<p className="msg-sendr">{message.senderId}</p>)}
                        content={(

                            <p className="msg-st" id={message.id} onDoubleClick={confirm}>{message.text}</p>


                        )}
                        datetime={(
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(message.createdAt).fromNow()}</span>
                            </Tooltip>
                        )}
                    />
                    // <li key={index}>
                    //     <div>
                    //         <span>{message.senderId}</span>
                    //         <p>{message.text}</p>
                    //     </div>
                    // </li>
                ))}
            </ul>
        )


    }
}