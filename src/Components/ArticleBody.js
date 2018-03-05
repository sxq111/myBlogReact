import React, { Component } from 'react';
import RMD from 'react-markdown';

export default (props) => {
    return (
        <RMD source = {props.source||'找不到该文章'} />
    )
}
