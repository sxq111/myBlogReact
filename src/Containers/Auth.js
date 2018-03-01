import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button } from 'antd';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import {actions} from '../Action/login/login';
@connect(
    state => {
        //  const { store = {} } = state || {};
        console.log(state);
        return state.LOGIN||{};
    }
    ,
    dispatch => ({
        bindedactions: bindActionCreators({ ...actions }, dispatch),
    })
)
export default class Auth extends Component {
    render(){ 
        console.log(this.props)
        return(
                this.props.loginData || this.props.location.pathname=== '/login'?
                <div/>:<Redirect from='/' to = '/login'/>)
    }
}