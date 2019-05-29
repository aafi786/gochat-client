import React, { Component } from "react"
import {
    Comment, Tooltip
} from 'antd';


// import { Spin } from 'antd';
import moment from 'moment';

export default class MessageList extends Component {
    constructor() {
        super();
        this.delmsg = this.delmsg.bind(this);
    }
    delmsg(e) {
        this.props.delmsg(e.target.id)
    }
    render() {
        return (

            <ul>

                {this.props.messages.map((message, index) => (
                    <Comment key={index}
                        author={(<p className="msg-sendr">{message.senderId}</p>)}
                        content={(

                            <p className="msg-st" id={message.id} onDoubleClick={this.delmsg} >{message.text}</p>


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