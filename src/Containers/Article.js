import React, { Component } from 'react';
import FileMap from '../articlesHelper/fileMap.json';
import Article from '../Components/ArticleBody';

const Gitment = require('gitment');
require('gitment/style/default.css');

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        let { match: { params } } = this.props;
        import(`../articles/${params.tag}/${params.name}`).then(md=>{
            this.setState({ md: md.getArticle() });
        })
        let gitment = new Gitment({ ...window.gitmentConfig, id: `articles-${params.tag}-${params.name}` });
        gitment.render('container');
    }
    render() {
        return (
            <div style={{ padding: 10 }}>
                <div style={{ width: '95%', margin: '0 auto' }}>
                    <Article source={this.state.md || null} />
                </div>
                <div id='container' ></div>
            </div>
        );
    }
}
