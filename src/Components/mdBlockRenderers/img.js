import React, { Component } from 'react';
// import IMG from 'SRC/articlesHelper/fileMap.json';
export default class extends Component {

    render() {
        let theImg = null;
        if (/\\src\\articles/.test(this.props.src)) {
            let path = (this.props.src.split('\\src\\')[1]);
            path = path.split('\\');
            path.shift();
            path = path.join('/').split('?')[0];
            theImg = require(`../../articles/${path}`);
            console.log(path);
        }
        return (
            <img alt = '暂无图片' src = {theImg} />
        )
    }
}