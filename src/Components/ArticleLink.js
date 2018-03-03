import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

export default (props) => {
    return (
        <Tag color="#108ee9">
            <Link to={`/${props.tag}/${props.name}`}>
                {props.name}
            </Link>
        </Tag>
    )
}
