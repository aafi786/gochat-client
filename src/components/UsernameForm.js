import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
export default class UsernameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            loading: false,
            iconLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            username: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.username);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    enterLoading = () => {
        this.setState({ loading: true });
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    }
    render() {

        return (
            <div className="usernameform">
                <h1>Welcome To Collab Chat</h1>
                <Form onSubmit={this.onSubmit} className="login-form">
                    <Form.Item>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.onChange} />

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading} onClick={this.enterLoading}>
                            Lets Chat
                         </Button>

                    </Form.Item>
                </Form>

            </div>
        )
    }

}

