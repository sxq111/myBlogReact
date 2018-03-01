import { Button, Input ,Menu} from 'antd';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default (props)=>{
    return (
        <div style = {{width:'100%',background:'rgb(64,64,64)'}}>
        <Menu
            theme="dark"
            // style = {{width:'200px',height:'32px',lineHeight:'30px',margin:'0 auto'}}
            mode="horizontal">
            <Menu.Item key="home">
                <Link style = {{display:'inline-block',width:'60px',textAlign:'center'}}
                to = '/home'>
                主页
                </Link>
            </Menu.Item>
            <Menu.Item key="page2">
                <Link style = {{display:'inline-block',width:'60px',textAlign:'center'}}
                to = '/page2'>
                page2
                </Link>
            </Menu.Item>
        </Menu>
        </div>
    )
}