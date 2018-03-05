import React, { Component } from 'react';
import FileMap from '../articlesHelper/fileMap.json';
import Article from '../Components/ArticleBody';
// import PNG from './test.png';

const Gitment = require('gitment');
require('gitment/style/default.css');

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        let { match: { params } } = this.props;
        let md = require(`../articles/${params.tag}/${params.name}`);
        this.setState({ md: md.getArticle() });
        let gitment = new Gitment({
            id: `articles-${params.tag}-${params.name}`, // 可选。默认为 location.href
            owner: 'sxq222',
            repo: 'sxq222.github.io',
            oauth: {
                client_id: 'c9f0c157b8f5ae0d2dfa',
                client_secret: '6d66c15318a8ffafaf7cd6e9361dd1b8bfea511d',
            },
        });
        gitment.render('container');
    }
    render() {
        return (
            <div style={{ padding: 10 }}>
                <div style = {{width:'95%',margin:'0 auto'}}>
                    <Article source={this.state.md || null} />
                </div>
                <div id = 'container' ></div>
                {/* <img src = {PNG}/> */}
            </div>
        );
    }
}
