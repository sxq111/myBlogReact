import { Menu } from 'antd';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
@withRouter
export default class extends Component {
    render() {
        return (
            <Menu
                style={{ width: 120, height: '100%', float: 'left' }}
                mode="inline">
                {
                    Object.keys(this.props.fileMap||[]).map(tag => {
                        return (
                            <Menu.Item key={tag}>
                                <div
                                    onClick={() => {
                                        this.props.onChangeTag(tag);
                                        this.props.history.push('/');
                                    }}>
                                    <span>{tag}</span>
                                </div>
                            </Menu.Item>)
                    })
                }
            </Menu>
        )
    }
}