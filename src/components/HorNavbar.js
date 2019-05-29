import React, { Component } from "react";
import { Menu, Icon } from 'antd';
export default class HorNavbar extends Component {
    render() {
        return (

            <Menu className="navba" mode="horizontal">
                <Menu.Item key="mail">
                    <ion-icon name="paper-plane" style={{ fontSize: '25px', color: '#3498db' }}></ion-icon>  Gochat
                </Menu.Item>
                <Menu.Item style={{ float: 'right' }} key="mal">
                    Welcome, {this.props.usern}
                </Menu.Item>

            </Menu>
        )
    }
}