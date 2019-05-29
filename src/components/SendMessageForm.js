import React, { Component } from "react";
import {
    Form, Input, Select, Button,
} from 'antd';

export default class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmitMsg(this.state.message);
        this.setState({
            message: ''
        })
    }
    onChange(e) {
        this.setState({
            message: e.target.value
        })
        this.props.onChange();
    }
    render() {
        return (
            <div>
                <span>
                    <Form layout="inline" onSubmit={this.onSubmit}>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Write Message"
                                onChange={this.onChange}
                                className="send-msg"
                                style={{ width: '600px', height: '60px' }}
                            />
                        </Form.Item>
                        {/* <Form.Item>
                            <Button type="primary" htmlType="submit">Send</Button>
                        </Form.Item> */}
                    </Form>
                </span>

            </div>
        )
    }
}